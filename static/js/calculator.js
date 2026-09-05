/**
 * Nexus Calculator - Frontend Logic with Flask API Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  const mainDisplay = document.getElementById('mainDisplay');
  const historyDisplay = document.getElementById('historyDisplay');
  const notification = document.getElementById('calcNotification');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const apiStatus = document.getElementById('apiStatus');

  let currentInput = '0';
  let previousValue = null;
  let currentOperation = null;
  let shouldResetDisplay = false;
  let calculationHistory = [];

  const opSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    power: '^',
    percentage: '%'
  };

  // Update display
  function updateDisplay() {
    mainDisplay.textContent = currentInput;

    // Adjust font size dynamically for long numbers
    if (currentInput.length > 12) {
      mainDisplay.style.fontSize = '1.8rem';
    } else if (currentInput.length > 8) {
      mainDisplay.style.fontSize = '2.2rem';
    } else {
      mainDisplay.style.fontSize = '2.8rem';
    }
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
      notification.classList.remove('active');
    }, 3000);
  }

  function appendNumber(number) {
    if (shouldResetDisplay) {
      currentInput = '';
      shouldResetDisplay = false;
    }

    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function chooseOperation(operation) {
    if (currentOperation !== null && !shouldResetDisplay) {
      // Chain calculation
      executeCalculation(() => {
        setupNextOperation(operation);
      });
      return;
    }

    setupNextOperation(operation);
  }

  function setupNextOperation(operation) {
    currentOperation = operation;
    previousValue = parseFloat(currentInput);
    historyDisplay.textContent = `${previousValue} ${opSymbols[operation]}`;
    shouldResetDisplay = true;
    highlightOperatorButton(operation);
  }

  function highlightOperatorButton(operation) {
    document.querySelectorAll('.btn-op').forEach(btn => btn.classList.remove('active'));
    if (operation) {
      const activeBtn = document.querySelector(`[data-op="${operation}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
  }

  async function executeCalculation(callback) {
    if (currentOperation === null || previousValue === null) return;

    const currentValue = parseFloat(currentInput);
    const op = currentOperation;
    const a = previousValue;
    const b = currentValue;

    highlightOperatorButton(null);

    try {
      // Call Flask Backend API
      const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: op,
          a: a,
          b: b
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showNotification(data.error || 'Calculation error');
        currentInput = 'Error';
        updateDisplay();
        shouldResetDisplay = true;
        return;
      }

      // Successful calculation
      const result = data.result;
      const formattedResult = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString();

      historyDisplay.textContent = `${a} ${opSymbols[op]} ${b} =`;
      currentInput = formattedResult;
      updateDisplay();

      // Add to sidebar history
      addToHistory(a, op, b, formattedResult);

      previousValue = result;
      currentOperation = null;
      shouldResetDisplay = true;

      if (callback) callback();
    } catch (err) {
      showNotification('API connection failed');
      console.error(err);
    }
  }

  function clearAll() {
    currentInput = '0';
    previousValue = null;
    currentOperation = null;
    shouldResetDisplay = false;
    historyDisplay.innerHTML = '&nbsp;';
    highlightOperatorButton(null);
    updateDisplay();
  }

  function deleteLast() {
    if (shouldResetDisplay || currentInput === 'Error') {
      clearAll();
      return;
    }
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
      currentInput = '0';
    } else {
      currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
  }

  function addToHistory(a, op, b, result) {
    const item = {
      calculation: `${a} ${opSymbols[op]} ${b}`,
      result: result
    };
    calculationHistory.unshift(item);
    renderHistory();
  }

  function renderHistory() {
    if (calculationHistory.length === 0) {
      historyList.innerHTML = `
        <div class="empty-history">
          No computations yet.<br><small>Operations processed by Flask API will appear here.</small>
        </div>
      `;
      return;
    }

    historyList.innerHTML = calculationHistory.slice(0, 10).map((item, idx) => `
      <div class="history-item" data-index="${idx}">
        <span class="history-item-calc">${item.calculation} =</span>
        <span class="history-item-result">${item.result}</span>
      </div>
    `).join('');

    // Attach click to restore
    document.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.getAttribute('data-index');
        const selected = calculationHistory[idx];
        currentInput = selected.result;
        shouldResetDisplay = true;
        updateDisplay();
      });
    });
  }

  clearHistoryBtn.addEventListener('click', () => {
    calculationHistory = [];
    renderHistory();
  });

  // Keypad click handlers
  document.querySelectorAll('.btn-num').forEach(button => {
    button.addEventListener('click', () => {
      appendNumber(button.getAttribute('data-num'));
    });
  });

  document.querySelectorAll('.btn-op').forEach(button => {
    button.addEventListener('click', () => {
      chooseOperation(button.getAttribute('data-op'));
    });
  });

  document.getElementById('btnClear').addEventListener('click', clearAll);
  document.getElementById('btnDel').addEventListener('click', deleteLast);
  document.getElementById('btnEquals').addEventListener('click', () => executeCalculation());

  // Physical Keyboard listener
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      appendNumber(e.key);
    } else if (e.key === '+') {
      chooseOperation('add');
    } else if (e.key === '-') {
      chooseOperation('subtract');
    } else if (e.key === '*') {
      chooseOperation('multiply');
    } else if (e.key === '/') {
      e.preventDefault();
      chooseOperation('divide');
    } else if (e.key === '^') {
      chooseOperation('power');
    } else if (e.key === '%') {
      chooseOperation('percentage');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      executeCalculation();
    } else if (e.key === 'Backspace') {
      deleteLast();
    } else if (e.key === 'Escape') {
      clearAll();
    }
  });

  // Health check API
  fetch('/')
    .then(res => res.json())
    .catch(() => {
      apiStatus.innerHTML = '<span class="status-dot" style="background:#ef4444;box-shadow:0 0 10px #ef4444"></span><span class="status-text" style="color:#f87171">Offline</span>';
    });
});

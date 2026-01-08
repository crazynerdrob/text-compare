document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const originalText = document.getElementById('original-text');
    const modifiedText = document.getElementById('modified-text');
    const compareBtn = document.getElementById('compare-btn');
    const diffOutput = document.getElementById('diff-output');

    // Check if Diff library is loaded
    if (typeof Diff === 'undefined') {
        console.error('Diff library not loaded!');
        diffOutput.innerHTML = '<div style="color:red; padding:20px;">Error: Diff library failed to load. Please check your internet connection.</div>';
        diffOutput.classList.remove('hidden');
        return;
    }

    // State
    let currentView = 'split'; // 'split' or 'unified'
    let lastComparison = { text1: '', text2: '' };

    // View Toggles
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update State
            currentView = btn.dataset.view;

            // Re-render if we have data
            if (lastComparison.text1 || lastComparison.text2) {
                renderDiff(lastComparison.text1, lastComparison.text2);
            }
        });
    });

    // Compare Button Click Handler
    compareBtn.addEventListener('click', () => {
        const text1 = originalText.value;
        const text2 = modifiedText.value;

        if (!text1 && !text2) {
            alert('Please enter some text to compare.');
            return;
        }

        lastComparison = { text1, text2 };
        renderDiff(text1, text2);
    });

    function renderDiff(text1, text2) {
        diffOutput.innerHTML = '';
        diffOutput.classList.remove('hidden');

        if (currentView === 'split') {
            renderSplitView(text1, text2);
        } else {
            renderUnifiedView(text1, text2);
        }
    }

    function renderUnifiedView(text1, text2) {
        diffOutput.className = 'diff-container diff-unified';
        const diff = Diff.diffWords(text1, text2);
        const fragment = document.createDocumentFragment();

        diff.forEach((part) => {
            const span = document.createElement(part.added ? 'ins' : part.removed ? 'del' : 'span');
            span.textContent = part.value;
            fragment.appendChild(span);
        });

        diffOutput.appendChild(fragment);
    }

    function renderSplitView(text1, text2) {
        diffOutput.className = 'diff-container diff-split';

        // Use diffLines for split view structure
        const diff = Diff.diffLines(text1, text2);

        const leftCol = document.createElement('div');
        leftCol.className = 'split-col left';

        const rightCol = document.createElement('div');
        rightCol.className = 'split-col right';

        let leftLineNum = 1;
        let rightLineNum = 1;

        diff.forEach((part) => {
            // Split part.value into lines since diffLines chunks them
            // remove last empty element if it exists due to split
            const lines = part.value.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            lines.forEach(line => {
                if (part.removed) {
                    // Removed: Show on Left (Red), Empty on Right
                    appendLine(leftCol, line, 'removed', leftLineNum++);
                    appendLine(rightCol, '', 'empty', null);
                } else if (part.added) {
                    // Added: Empty on Left, Show on Right (Green)
                    appendLine(leftCol, '', 'empty', null);
                    appendLine(rightCol, line, 'added', rightLineNum++);
                } else {
                    // Unchanged: Show on both
                    appendLine(leftCol, line, '', leftLineNum++);
                    appendLine(rightCol, line, '', rightLineNum++);
                }
            });
        });

        diffOutput.appendChild(leftCol);
        diffOutput.appendChild(rightCol);
    }

    function appendLine(container, content, type, num) {
        const lineDiv = document.createElement('div');
        lineDiv.className = `diff-line ${type}`;

        const numSpan = document.createElement('span');
        numSpan.className = 'line-num';
        numSpan.textContent = num || '';

        const contentSpan = document.createElement('span');
        contentSpan.className = 'line-content';
        contentSpan.textContent = content || ' '; // Ensure height

        lineDiv.appendChild(numSpan);
        lineDiv.appendChild(contentSpan);
        container.appendChild(lineDiv);
    }

    // Clear Buttons
    document.getElementById('clear-original').addEventListener('click', () => originalText.value = '');
    document.getElementById('clear-modified').addEventListener('click', () => modifiedText.value = '');

    // Paste Buttons
    document.getElementById('paste-original').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            originalText.value = text;
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    });

    document.getElementById('paste-modified').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            modifiedText.value = text;
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    });
});

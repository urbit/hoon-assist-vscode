class HoonAssistView {

  constructor() {
    this.term = null;
    this.element = document.getElementById('hoon-assist');
    this.assistPanel = document.getElementById('assist-panel');
    this.assistPanel.innerHTML = this.defaultHtml();

    window.addEventListener('message', event => {
      const message = event.data;

      switch (message.type) {
        case 'updateContents': {
          this.updateContents(message.data);
          break;
        }
        case 'clearContents': {
          this.updateContents(null);
          break;
        }
      }
    });
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  updateContents(html) {
    this.assistPanel.innerHTML = html || this.defaultHtml();
    this.assistPanel.scrollTop = 0;
  }

  defaultHtml() {
    return "<h4>Hoon Assist</h4><p>Move cursor over Hoon term for documentation.</p>";
  }

}

const view = new HoonAssistView();
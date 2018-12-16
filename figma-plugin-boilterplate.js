class ExamplePlugin {
  constructor () {
    this.options = [
      'Alert File Name',
      this.main.bind(this),
      null,
      { shift: true, option: true, key: 't' }
    ]

    const { figmaPlugin } = window
    figmaPlugin.createPluginsMenuItem(...this.options)
  }

  main () {
    const { App, alert } = window
    const fileName = App.getCurrentFileName()

    alert(fileName)
  }
};

window.examplePlugin = new ExamplePlugin()

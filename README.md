# select-pasted-text

This Visual Studio Code extension provides a command that allows you to automatically select the text that was just pasted into the active editor.

The command is `select-pasted-text.PasteAndSelect`.

You may need to manually set the keybinding for this command in your `keybindings.json` file. For example:

```json
{
    "key": "ctrl+v",
    "command": "select-pasted-text.PasteAndSelect"
}
```
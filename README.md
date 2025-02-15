This is my take on the classic [.plan file](https://en.wikipedia.org/wiki/Finger_(protocol)#Finger_user_information_protocol).

You need to create a `config.json` file in the top level folder, like so:

```json
{
    "author": "John Doe",
    "fullOutputFilePath": "C:\\Path\\To\\Output\\file.html"
}
```

Then add your markdown files to the `input_markdown` folder. The `build.js` routine will concatenate those files together in alphabetical order, then convert them to HTML and insert them between the header and footer from the `input_html` folder before writing the complete output to disk. The header includes formatting from [water.css](https://github.com/kognise/water.css).

I use [fnm](https://github.com/Schniz/fnm) to manage my node environment with PowerShell. `node build.js` rebuilds the output; you can also use `ctrl+shift+b` if you open the project in VS Code. There are only a few dependencies, listed in `package.json` as per usual. They can be installed with the typical `npm install` command.

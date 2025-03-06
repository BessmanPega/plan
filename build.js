import fs from 'fs';
import { exit } from 'node:process';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItTableOfContents from 'markdown-it-table-of-contents';
import MarkdownItAnchor from 'markdown-it-anchor';

const md =
  new MarkdownIt({ linkify: true })
    .use(MarkdownItTaskLists)
    .use(MarkdownItTableOfContents, { includeLevel: [1, 2] })
    .use(MarkdownItAnchor);

const config = fs.readFileSync("config.json");
const configJson = JSON.parse(config);
const output_html_file_name = configJson.fullOutputFilePath
const html_header_file_name = "input_html/header.html"
const html_footer_file_name = "input_html/footer.html"

const input_markdown_file_names = [];
try
{
  const files = fs.readdirSync("input_markdown")
  files.forEach(file => {
    input_markdown_file_names.push(path.join("input_markdown", file))
  });
}
catch (err)
{
  console.log("Could not read files from input_markdown: " + err);
  exit(-1);
}

let concatenated_content = "";
for (const file_name of input_markdown_file_names)
{
  concatenated_content += "\n" + fs.readFileSync(file_name);
  console.log(`Read ${file_name}`);
}

const html_header_content = fs.readFileSync(html_header_file_name)
console.log(`Read ${html_header_file_name}`);

const html_footer_content = fs.readFileSync(html_footer_file_name);
console.log(`Read ${html_footer_file_name}`);

const html_title_content = "\n<h1>" + configJson.author + "'s plan file</h1>\n";
const html_timestamp_content = "\n<h6>Last updated: " + Date().toLocaleString() + "</h6>\n";

const html_body_content =  html_header_content + html_title_content + html_timestamp_content + md.render(concatenated_content) + "\n" + html_footer_content;
fs.writeFileSync(output_html_file_name, html_body_content);
console.log(`Wrote ${output_html_file_name}`);

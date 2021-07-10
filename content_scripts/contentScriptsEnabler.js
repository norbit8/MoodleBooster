const link = window.location.href

const DISABLE_CONTENT_SCRIPTS_REGEX = /.*(.pdf|.xls|.docx|.odt|.xlsx|.ods|.ppt|.pptx|.doc)$/
const ContentScriptsEnabled = link.match(DISABLE_CONTENT_SCRIPTS_REGEX) == null

console.log(`content scripts ${ContentScriptsEnabled ? "enabled" : "disabled"}`)

const link = window.location.href

window.RunContentScripts = !link.match(/.*(.pdf|.xls|.docx|.odt|.xlsx|.ods|.ppt|.pptx|.doc|)/)

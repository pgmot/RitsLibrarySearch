
function searchAndJump(word){
    window.open("http://runners.ritsumei.ac.jp/opac/opac_list.cgi?lang=0&smode=0&local=on&disp=1&kywd="+word+"&main_method=0", null);
}

function searchWithAmazon(info, tab){
    var url = info.pageUrl;
    var isbn = url.match(/(\d{10})/)[0];

    searchAndJump(isbn);
}

function searchWithSelectionWord(info, tab){
    var word = info.selectionText;

    searchAndJump(word);
}

var parentId = chrome.contextMenus.create({
    "title": "立命図書館検索",
    "type": "normal",
    "contexts": ["all"]
});

chrome.contextMenus.create({
    "title": "Amazonから検索",
    "type": "normal",
    "contexts": ["all"],
    "documentUrlPatterns": ["http://www.amazon.co.jp/dp/*", "http://www.amazon.co.jp/*/dp/*"],
    "parentId": parentId,
    "onclick": searchWithAmazon
});

chrome.contextMenus.create({
    "title": "選択文字から検索",
    "type": "normal",
    "contexts": ["selection"],
    "parentId": parentId,
    "onclick": searchWithSelectionWord
});

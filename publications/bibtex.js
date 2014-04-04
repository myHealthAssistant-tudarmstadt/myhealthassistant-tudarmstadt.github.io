function show_bibtex(cite_id) {
	var div = getElement("id", cite_id);
	if(div) {
		if (div.style.display == 'block') {
			div.style.display ='none';
		} else {
			var content = getContentByElem(div);
			if(content == " ")
				get_bibtex(cite_id);
			else
				div.style.display = 'block';
		}
	}
}

// initialize AJAX
var http = null;
if (window.XMLHttpRequest) {
	http = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	http = new ActiveXObject("Microsoft.XMLHTTP");
}

function get_bibtex(cite_id) {
	if (http != null) {
		//http.open("GET", "/publications/bibtex.php?cite_id=" + cite_id, true);
		http.open("GET", "/publications/ajaxGen/" + cite_id.replace(/:/g, "%2523") + ".json", true);
		http.onreadystatechange = set_bibtex;
		http.send(null);
	}
}

function set_bibtex() {
	if (http.readyState == 4) {
		var data = eval("(" + unescape(http.responseText) + ")");
		var div = getElement("id", data[0]);
		setContentByElem(div, data[1]);
		div.style.display = 'block';
	}
}

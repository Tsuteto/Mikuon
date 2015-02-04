
function init() {
	$("#conv").click(function(){
		main()
	});
}

function main() {
	var mikuon = new Mikuon($("#input"), $("#result"));
	mikuon.convert();
}

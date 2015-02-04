var Mikuon = function(input, result) {
	this.fldInput = input;
	this.fldResult = result;
};

Mikuon.convTable = {
	"あ": "a", "い": "i", "う": "M", "え": "e", "お": "o", 
	"か": "k a", "き": "k' i", "く": "k M", "け": "k e", "こ": "k o", 
	"さ": "s a", "し": "S i", "す": "s M", "せ": "s e", "そ": "s o", 
	"た": "t a", "ち": "tS i", "つ": "ts M", "て": "t e", "と": "t o", 
	"な": "n a", "に": "J i", "ぬ": "n M", "ね": "n e", "の": "n o", 
	"は": "h a", "ひ": "C i", "ふ": "p\\ M", "へ": "h e", "ほ": "h o", 
	"ま": "m a", "み": "m' i", "む": "m M", "め": "m e", "も": "m o", 
	"や": "j a", "ゆ": "j M", "いぇ": "j e", "よ": "j o", 
	"ら": "4 a", "り": "4' i", "る": "4 M", "れ": "4 e", "ろ": "4 o", 
	"わ": "w a", "うぃ": "w i", "うぇ": "w e", "を": "w o",
	
	"きゃ": "k' a", "きゅ": "k' M", "きょ": "k' o", 
	"しゃ": "S a", "すぃ": "s i", "しゅ": "S M", "しぇ": "S e", "しょ": "S o", 
	"ちゃ": "tS a", "つぃ": "ts i", "ちゅ": "tS M", "ちぇ": "tS e", "ちょ": "tS o", 
	"にゃ": "J a", "にゅ": "J M", "にぇ": "J e", "にょ": "J o", 
	"ひゃ": "C a", "ひゅ": "C M", "ひぇ": "C e", "ひょ": "C o", 
	"ふぁ": "p\\ a", "ふぃ": "p\\' M", "ふゅ": "p\\' M", "ふぇ": "p\\ e", "ふぉ": "p\\ o", 
	"みゃ": "m' a", "みゅ": "m' M", "みぇ": "m' e", "みょ": "m' o", 
	"りゃ": "4' a", "りゅ": "4' M", "りょ": "4' o", 
	"が": "g a", "ぎ": "g' i", "ぐ": "g M", "げ": "g e", "ご": "g o", 
	"か゜": "N a", "き゜": "N' i", "く゜": "N M", "け゜": "N e", "こ゜": "N o", 
	"ざ": "dz a", "じ": "dZ i", "ず": "dz M", "ぜ": "dz e", "ぞ": "dz o", 
	"だ": "d a", "ぢ": "d i", "づ": "d M", "で": "d e", "ど": "d o", 
	"ば": "b a", "び": "b' i", "ぶ": "b M", "べ": "b e", "ぼ": "b o", 
	"ぱ": "p a", "ぴ": "p' i", "ぷ": "p M", "ぺ": "p e", "ぽ": "p o", 
	"ん": "n",  
	"ぎゃ": "g' a", "ぎゅ": "g' M", "ぎょ": "g' o", 
	"き゜ゃ": "N' a", "き゜ゅ": "N' M", "き゜ぇ": "N' e", "き゜ょ": "N' o", 
	"じゃ": "dZ a", "ずぃ": "dz i", "じゅ": "dZ M", "じぇ": "dZ e", "じょ": "dZ o", 
	"でぃ": "d' i", "でゅ": "d' M", 
	"びゃ": "b' a", "びゅ": "b' M", "びぇ": "b' e", "びょ": "b' o", 
	"ぴゃ": "p' a", "ぴゅ": "p' M", "ぴぇ": "p' e", "ぴょ": "p' o", 
	"ー": "", "っ": ""
};

Mikuon.youonKana = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "゜"];

Mikuon.prototype = {
	convert: function() {
		var myself = this;
		var input = this.convKanaToHira(this.fldInput.val());
		var result = [];
		$.each(input.split("\n"), function() {
			result.push(myself.convertLine(this));
		});
		this.fldResult.val(result.join("\n"));
	},
	
	convertLine: function(input) {
		var atomized = this.atomize(input);
		var prevVowel = null;
		var result = [];
		$.each(atomized, function() {
			if ((this == "っ" || this == "ー")  && prevVowel != null) {
				result.push(prevVowel)
			} else {
				var pron = Mikuon.convTable[this];
				if (pron != undefined) {
					result.push(pron);
					prevVowel = pron.slice(-1);
				} else {
					result.push(this);
					prevVowel = null;
				}
			}
		});
		return result.join(" ");
	},

	atomize: function(text) {
		var chars = text.split("");
		var result = [];
		var atom = "";
		for (var i = 0; i < chars.length; i++) {
			var curr = chars[i];
			var next = i < chars.length - 1 ? chars[i + 1] : "";
			atom += curr;

			if (!this.isYouon(next)) {
				result.push(atom);
				atom = "";
			}
		}
		return result;
	},

	isYouon: function(input) {
		return $.inArray(input, Mikuon.youonKana) != -1;
	},

	convKanaToHira: function(input) {
		return input.replace(/[ァ-ン]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0x60);
		});
	}
};
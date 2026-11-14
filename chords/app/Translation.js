/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function () {

	var languageText = {
		"Chords_UI_Minor" : {"message" : "Minor"},
		"Chords_UI_Major" : {"message" : "Major"},
		"Chords_UI_Press_Key" : {"message" : "Press a key"}
	};

	function capitalize(str){
		return str.charAt(0).toUpperCase() + str.substr(1);
	}

	//the number of attempts to get the translation
	var tries = 0;

	/**
	 * localize the given word into the desired language
	 * @param  {String} word
	 * @return {String} 
	 */
	return {
		// kids.sauravsood.com: English only, so nothing is fetched from another site.
		load : function(origin, callback){
			callback();
		},
		localize : function(phrase){
			if (languageText){
				if (languageText[phrase]){
					return languageText[phrase].message;
				} else {
					return phrase;
				}
			} else {
				return phrase;
			}
		},
		localizeChord : function(key, mode){
			var transKey = key+"_"+capitalize(mode)+"_Chord";
			if (languageText && languageText[transKey]){				
				return languageText[transKey].message;
			} else {
				return key + " " + " " + mode + " chord";
			}
		}
	};
});
// ==UserScript==
// @name         Forvo Audio in the Memrise Level Editor
// @namespace    https://greasyfork.org/users/5238-carpiediem
// @version      0.2
// @description  Adds a column to the Memrise level editor with buttons to check for Forvo audio
// @author       carpiediem
// @installURL   https://greasyfork.org/scripts/6305-forvo-audio-in-the-memrise-level-editor/code/Forvo%20Audio%20in%20the%20Memrise%20Level%20Editor.user.js
// @match        http://www.memrise.com/course/*/*/edit/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        none
// ==/UserScript==

// This script will not work until you enter your own Forvo.com API key
// To get an API key follow these steps:
//   1. If you don't have a Forvo account already, browse to http://www.forvo.com/signup/ and sign up.
//   2. Check your email & click the link to verify your account.
//   3. Browse to http://api.forvo.com/login/ and log in.
//   4. Click on the "Plans & Pricing" tab and click the button for the Free Plan. <http://api.forvo.com/plans-and-pricing/>.
//   5. Check the box to accept the license terms and click on the "Choose plan for free" button.
//   6. Click on the "Your account" tab. <http://api.forvo.com/account/>
//   7. Copy the API key (a string of letters and numbers) on the right side of the screen.
//   8. Paste the key in hte line of code below.  Replace the Xs, but keep the quotes.
forvoApiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXX';


$('.container-main').css('width','1100px');

document.addEventListener("DOMNodeInserted", function(e) {
    if (e.relatedNode.className != "level-things table") return false;
    
    $(e.relatedNode).find('th').eq(4).after('<th class="column"><span class="txt">Other Audio</span></th>');
    $(e.relatedNode).find('tr').each(function(){
        var word = $(this).find('td').eq(1).find('.text').text();
        $(this).find('td').eq(4).after('<td><div class="btn-group forvo-check" data-word="' + word + '"><button class="btn btn-mini dropdown-toggle" data-toggle="dropdown" style="overflow:hidden;">Check Forvo<i class="ico ico-s ico-arr-down"></i></button><div class="dropdown-menu audios"><img src="https://d107cgb5lgj7br.cloudfront.net/img/icons/loader@2x.gif" style="width:30px;" /></div></div></td>');
    });
    
    $('.forvo-check .dropdown-menu').css({'min-width':'30px', padding:'5px'});
    
    $('.forvo-check').click(function(){
        var languageCode = forvoCodes[ $('.add-level .dropdown-menu a:first').text().trim() ];
        //console.log(languageCode
        
        var word = encodeURI( $(this).attr("data-word") );

        $.ajax({
            url: "http://apifree.forvo.com/action/word-pronunciations/format/json/word/" + word + "/language/" + languageCode + "/order/rate-desc/limit/4/key/" + forvoApiKey + "/",
            jsonpCallback: "showForvoLinks",
            dataType: "jsonp",
            type: "jsonp",
        });
    });
    
}, true);  //end of addEventListener


showForvoLinks = function(data){
    popupHTML = '';
    for (i in data.items) popupHTML += '<p><a class="audio-player audio-player-hover" href="' + decodeURI(data.items[i].pathmp3) + '"></a></p>';
    if (popupHTML=='') popupHTML = 'nothing';
    $('.forvo-check .dropdown-menu').html(popupHTML);
}

var forvoCodes = {
    'Afrikaans':'af',
    'Ainu':false,
    'Akan-Twi':'ak',
    'Albanian':'sq',
    'Algonquian languages':false,
    'Amharic':'am',
    'Ancient Greek':'grc',
    'Anglo-Saxon':false,
    'Arabic':'ar',
    'Arabic Alphabet':'ar',
    'Aramaic':false,
    'Azerbaijani':'az',
    'Basque':'eu',
    'Belarusian':'be',
    'Bengali':'bn',
    'Bosnian':'bs',
    'Breton':'br',
    'Bulgarian':'bg',
    'Burmese':'my',
    'Cantonese':'yue',
    'Cantonese Jyutping':'yue',
    'Catalan':'ca',
    'Cherokee':'chr',
    'Chinese':'zh',
    'Citizen Potawatomi':false,
    'Classical Quranic Arabic':'ar',
    'Coptic':false,
    'Cornish':'kw',
    'Creek':'mus',
    'Croatian':'hr',
    'Czech':'cs',
    'Danish':'da',
    'Dovahzul':false,
    'Dutch':'nl',
    'Eastern Armenian':'hy',
    'Egyptian (Ancient)':false,
    'Egyptian Arabic':'ar',
    'English':'en',
    'Esperanto':'eo',
    'Estonian':'et',
    'Faroese':'fo',
    'Farsi':'fa',
    'Finnish':'fi',
    'Flemish':'vls',
    'French':'fr',
    'Georgian':'ka',
    'German':'de',
    'Greek':'el',
    'Greenlandic':false,
    'Guarani':'gn',
    'Gujarati':'gu',
    'Gulf Khaliji Arabic':'ar',
    'Hakka':'hak',
    'Hausa':'ha',
    'Hawaiian':'haw',
    'Hebrew':'he',
    'Hindi':'hi',
    'Hungarian':'hu',
    'Icelandic':'is',
    'Indonesian':'ind',
    'Inuktitut':'iu',
    'Iraqi Arabic':'ar',
    'Irish':'ga',
    'Italian':'it',
    'Japanese':'ja',
    'Kanji':'ja',
    'Kaonde':false,
    'Khmer':'km',
    'Kinyarwanda':'rw',
    'Klingon':'tlh',
    'Korean':'ko',
    'Kurdish':'ku',
    'Kyrgyz':'ky',
    'Ladin':false,
    'Lakota':'lkt',
    'Latin':'la',
    'Latvian':'lv',
    'Laz':'lzz',
    'Levantine Arabic':'ar',
    'Lingala':'ln',
    'Lithuanian':'lt',
    'Lojban':'lmo',
    'Lu Mien':'hmn',
    'Luganda':'lg',
    'Lule Sami':'fi',
    'Luxembourgish':'lb',
    'Macedonian':'mk',
    'Malay':'ms',
    'Mandarin':'zh',
    'Mandarin Spoken Only':'zh',
    'Mandarin Traditional':'zh',
    'Mandinka':false,
    'Maori':'mi',
    'Marathi':'mr',
    'Marshallese':'mh',
    'Modern Standard Arabic - roman alph':false,
    'Mongolian':'mn',
    'Nahuatl languages':'nah',
    "Na'vi":false,
    'Nepali':'ne',
    'Ningbo Dialect':'wuu',
    'North African Maghrebi Arabic':'ar',
    'Northern Sami':'se',
    'Norwegian':'no',
    'Nyanja':false,
    'Occitan':'oc',
    'Ossetic':'os',
    'Pali':'pi',
    'Pashto':'ps',
    'Persian':'fa',
    'Polish':'pl',
    'Portuguese (Brazil)':'pt',
    'Portuguese (European)':'pt',
    'Punjabi':'pa',
    'Quechua':'qu',
    'Romaji':'ja',
    'Romanian':'ro',
    'Russian':'ru',
    'Sanskrit':'sa',
    'Scots':'sco',
    'Scottish Gaelic':'gd',
    'Serbian':'sr',
    'Sinhala':'si',
    'Slovak':'sk',
    'Slovenian':'sl',
    'Small German Dialects':'nds',
    'Somali':'so',
    'Soninke':false,
    'Southern Sami':'fi',
    'Spanish':'es',
    'Swahili':'sw',
    'Swedish':'sv',
    'Swiss German':'gsw',
    'Tagalog':'tl',
    'Taishanese':'yue',
    'Tamang':'ne',
    'Tamil':'ta',
    'Telugu':'te',
    'Thai':'th',
    'Tibetan':'bo',
    'Toki Pona':'x-tp',
    'Turkish':'tr',
    'Ukrainian':'uk',
    'Ume Sami':'fi',
    'Urdu':'ur',
    'Vietnamese':'vi',
    'Welsh':'cy',
    'Western Armenian':'hy',
    'Wolof':'wo',
    'Xhosa':'xh',
    'Yiddish':'yi',
    'Zulu':'zu'
};
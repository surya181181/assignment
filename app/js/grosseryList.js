/*********************************************************************************************************************** 
<summary>
This file is meant to be used as to fetch the Grossery list using XMLHttpRequest and populate on the UI.
</summary>
<remarks>
NOTE: This component can be child to any parent component.
</remarks>
<history>
     Suresh Gopalakrishnan 06/03/2018 -- Initial Version
</history>
</summary>
***********************************************************************************************************************/

(function () {

    'use strict';

    // use XMLHttpRequest to retrieve it, and report any errors that occur in the XMLHttpRequest operation is captured in console.
    // once the grosserylist have been successfully loaded and formatted as a JSON object
    // run the callback() function

    function getJsonData(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // sets up the app logic, declares required variables, contains all the other functions

    getJsonData('json/data.json', function (data) {
        //response object assigned to grosseryList
        var grosseryList = data;

        // grab the UI elements that we need to manipulate
        var ul = document.getElementById('grosseryList');

        // populating the individual grossery list using map method & returning to the UI using createNode & append Method
        return grosseryList.map(function (list) {
            var li = createNode('li');
            li.innerHTML = "<div class='category'>" + list.category + "</div><div class='type'>" + list.type + "</div><div class='item'>" + list.item + "</div><div class='brand'>" + list.brand + "</div><div class='qty'> Qty /" + list.qty + "</div>";
            append(ul, li);
        });
    });

    // create <li> elements method
    function createNode(element) {
        return document.createElement(element);
    }

    // append the elements to the DOM as appropriate, to add the grossary list to the UI Method
    function append(parent, el) {
        return parent.appendChild(el);
    }

})();

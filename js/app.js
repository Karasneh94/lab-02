'use strict';

let keys = [];
let selectedType;
let horns = [];
let ids = 1;

function Horn(url, title, description, keyword, horns) {


    this.url = url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    this.id = (ids++);



}


Horn.prototype.render = function () {


    let hornSection = $('#photo-template').clone();
    $('main').append(hornSection);
    hornSection.find('h2').text(this.title);
    hornSection.find('img').attr('src', this.url);
    hornSection.find('p').text(this.description);
    hornSection.find('img').attr('alt', this.description);
    hornSection.attr('id', this.id);


};

function getHornsData() {


    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };


    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(element => {

            let hornObj = new Horn(element.image_url, element.title, element.description, element.keyword, element.horns);

            if (keys.includes(element.keyword) === false) {
                keys.push(element.keyword);
                $('select').append(`<option value="${element.keyword}"> 
                ${element.keyword} 
           </option>`);
            }
            hornObj.render();
            $(`#${hornObj.id}`).css('display', 'inline-block');
            horns.push(hornObj);

        });
    });

}







$('document').ready(function () {

    getHornsData();
    $('select').change(function () {
        selectedType = $(this).children('option:selected').val();

        horns.forEach(element => {

            if (selectedType === element.keyword) {


                $(`#${element.id}`).remove();
                element.render();
                $(`#${element.id}`).css('display', 'inline-block');

            }
            if (selectedType !== element.keyword) {

                $(`#${element.id}`).css('display', 'none');

            }
            if (selectedType === 'default') {
                $(`#${element.id}`).remove();
                element.render();
                $(`#${element.id}`).css('display', 'inline-block');
            }


        });



    });


});

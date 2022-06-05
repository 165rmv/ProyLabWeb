/*import {currancy} from '../jsons/currency.json'
console.log(currancy)*/



function onchange(e) {
    //console.log(e.target.id)
    if (e.target.id === 'currency') {
        /*let json = [JSON.parse($.ajax({'url':'../jsons/currency.json', 'async': false}).responseText)];
        console.log(json[0])
        json.push({
            "currency": e.currentTarget.value
        });*/
        //console.log(json[1])
        //console.log(document.getElementsByClassName('precio'))

        // e.currentTarget.value
        let currency = e.currentTarget.value
        console.log("onChange: "+currency)
        //console.log("data: "+data)
        //window.location.reload();
    }
}

document.getElementById('currency').addEventListener('change', onchange);
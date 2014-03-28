function accion(type, _id){
    var data = new Object();
    data.modelName = "Genre";
    data.accion = type;

    switch(type){
        case "I":
            data.doc = new Object();
            $(".new").each(
                function(i, o){
                    var prop = $(o).prop("id");
                    data.doc[prop] = $("#" + prop).val();
                }
            );
        break;
        case "U":

        break;
        case "D":
            data.doc = new Object();
            data.doc._id = _id;
        break;
    }

    $.ajax({
        type: 'POST', 
        data: JSON.stringify(data), 
        contentType: 'application/json', 
        url: 'http://localhost:3003/action', 
        success: function(docs) {
            console.log("accion() success")
        },
        error: function(docs) {
            console.log("accion() error")
        },
        complete: function(docs) {
            list();
        }
    });
}

function list(){
    var data = {};
    data.title = "title";
    data.message = "message";
    
    $.ajax({
        type: 'POST', 
        data: JSON.stringify(data), 
        contentType: 'application/json', 
        url: 'http://localhost:3003/genre_list', 
        success: function(docs) {
            $("#table-body").find("tr:not(.newtr)").remove();
            if(docs != ""){
                for(i = 0; i < docs.length; i++){
                    var doc = docs[i];
                    var html = "";
                    html += "<tr>";
                    for(prop in doc){
                        if (!(/^_/).test(prop)){
                            html += "<td>";
                            html += "<input name='" + prop + "_" + doc._id + "' value='" + doc[prop] + "'>";
                            html += "</td>";
                            html += "<td>";
                            html += "<a href='javascript:accion(\"U\", \"" + doc._id + "\")'>Update</a>";
                            html += "<a href='javascript:accion(\"D\", \"" + doc._id + "\")'>Delete</a>";
                            html += "</td>";
                        }
                    }                            
                    html += "</tr>";
                    $("#table-body").prepend(html);
                }
            }
        }
    });
}

$( document ).ready(function() {
    list();
});
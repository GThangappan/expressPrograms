(function () {
    window.setContentsBy = function (schema, divId,tableId) {
        
        schema.fields.forEach(function (element) {
            createElement(element,divId,schema);
        });
        
        displayTable(tableId,schema);        
    }
    function displayTable(tableId,schema){
       /*var temp={};
        temp.vals=[];
        window.localStorage.setItem("todo",JSON.stringify(temp));*/
        var table_contents=JSON.parse(window.localStorage.getItem("todo"));        
        var tr=document.createElement("tr");
        schema.fields.forEach(function(element){
            if(element.widget!="button"){
                var th=document.createElement("th");
                th.innerHTML=element.name;
                btn=document.createElement("button");
                btn.innerHTML="&nabla;";
                btn.onclick=function(){sortBy(element.name)};
                th.appendChild(btn);
                tr.appendChild(th);
            }
        });
        document.getElementById(tableId).appendChild(tr);
		table_contents.vals.forEach(function(telement){
			var tr=document.createElement("tr");
			console.log(telement);
			schema.fields.forEach(function(selement){
				if(selement.widget!="button"){
				var contenttype=selement.name.toLowerCase();
				var td=document.createElement("td");
				td.innerHTML=telement[contenttype];
				tr.appendChild(td);
				}
			});
			document.getElementById(tableId).appendChild(tr);
		});
        
    }
    function sortByPriority(values){
       values.vals.sort(function(a,b){
           return parseInt(a[3])-parseInt(b[3]);
       })
       console.log(values);
       window.localStorage.setItem("todo",JSON.stringify(values));
    }
    function sortBy(cont){
        var values=JSON.parse(window.localStorage.getItem("todo"));
        values.vals.sort(function(a,b){
            var nameA = a[cont.toLowerCase()].toUpperCase(); // ignore upper and lowercase
            var nameB = b[cont.toLowerCase()].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        
        console.log(values);
        window.localStorage.setItem("todo",JSON.stringify(values));
		if(cont=="Priority"){
			sortByPriority(values);
		}
        window.location.reload();        
     }
    function createElement(element,divId,schema) {
        widget[element.widget](element,divId,schema);
    }
    var widget = {
        "input": function (element,divId,schema) {
            var row = document.createElement("tr");
            var column1 = document.createElement("td");
            column1.innerHTML = element.name;
            var column2 = document.createElement("td");
            var inputField = document.createElement("input");
            inputField.type = element.dataType;
            inputField.id = element.name.toLowerCase();
            column2.appendChild(inputField);
            row.appendChild(column1);
            row.appendChild(column2);
            document.getElementById(divId).appendChild(row);
        },
        "button": function (element,divId,schema) {
            var row = document.createElement("tr");
            var column = document.createElement("td");
            var buttonField = document.createElement("button");
            buttonField.innerHTML = element.name;
            buttonField.onclick = function () { saveDetailsBy(schema); };
            column.appendChild(buttonField);
            row.appendChild(column);
            document.getElementById(divId).appendChild(row);
        }
    }
    function saveDetailsBy(schema){
        var js=JSON.parse(window.localStorage.getItem("todo"));
        var valt={};
        schema.fields.forEach(function(element){
            if(element.widget!="button"){                
                valt[element.name.toLowerCase()]=document.getElementById(element.name.toLowerCase()).value;
            }            
        });
        js.vals.push(valt);
		console.log(js);
        window.localStorage.setItem("todo",JSON.stringify(js));
        //window.location.reload();
    }
})();
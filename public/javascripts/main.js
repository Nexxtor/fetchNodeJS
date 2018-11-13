let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/materia")
                .then(res => res.json())
                .then(data => {
                    let materias = document.getElementsByClassName("materias")[0];

                    materias.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                          ` <tr>
                                <td class="name">${element.nombre}</td>
                                <td class="uv">${element.uv}</td>
                                <td class="options"> 
                                    <a data-id="${element._id}" class="more" href=""> More</a>
                                    <a data-id="${element._id}" class="edit" href=""> Edit </a>
                                    <a data-id="${element._id}" class="delete" href=""> Delete </a>
                                </td>
                            </tr>`
                    }, "");

                    document.querySelectorAll(".delete").forEach(element => {
                        element.addEventListener('click', function(event){
                            event.preventDefault();
                            let id = element.getAttribute("data-id");
                            fetch('/materia/'+id, { method: 'DELETE'})
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                       materias.removeChild( element.parentElement.parentElement);
                                    } 
                                }).catch(err => {
                                    console.log(err);
                                });
                        });
                    });
                    document.querySelectorAll(".more").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    console.log(data);
                                });
                        });
                    });

                    
                });
        }
        let form = document.forms.saveMateria;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    loadContent();
                });
        });

        loadContent();
    }
};
window.onload = () => app.init();
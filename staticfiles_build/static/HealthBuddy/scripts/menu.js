const searchForm = document.querySelector(".menu_search");
const searchFormBtn = document.querySelector(".menu_search_btn");

const removeItem = (id) => {
    const deleteBtn = document.getElementById("menu_item-" + id);
    fetch(`/remove_menu_item/${id}`).then(response => response.json()).then(
        deleteBtn.style.display = 'none'
    )
}

function submitForm(event) {
    searchForm.submit();
    event.preventDefault();
}

searchFormBtn.addEventListener('click', submitForm);
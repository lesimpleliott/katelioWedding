const openDayFolder = (day, checkbox) => {
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            day.style.maxHeight = "5000px";
        } else {
            day.style.maxHeight = "50px";
        }
    });
};

openDayFolder(friday, fridayCheckbox);
openDayFolder(saturday, saturdayCheckbox);
openDayFolder(sunday, sundayCheckbox);
openDayFolder(monday, mondayCheckbox);

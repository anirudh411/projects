var budgetController = (function () {

    var Expense = function (id, description, value) {

        this.id = id;

        this.description = description;

        this.value = value;

        this.percentage = -1;
    };
    Expense.prototype.calculatePercentag = function (totalIncome) {

        if (totalIncome > 0)

            this.percentage = Math.round(this.value / totalIncome) * 100;
    };
    Expense.prototype.getPercentage = function () {

        return this.percentage;
    };
    var Income = function (id, description, value) {

        this.id = id;

        this.description = description;

        this.value = value;
    };
    var calculateTotal = function (type) {

        var sum = 0;

        data.allItems[type].forEach(function (current) {

            sum += current.value;
        });
        data.total[type] = sum;
    };
    var data = {

        allItems: {

            exp: [],

            inc: []
        },
        total: {

            exp: 0,

            inc: 0
        },

        budget: 0,
        percentage: -1
    };
    return {

        addItem: function (type, des, val) {

            var newItem, id;

            if (id > 0) {

                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            else {

                id = 0;

            }

            if (type === 'inc') {

                newItem = new Expense(id, des, val);
            }

            else {

                newItem = new Income(id, des, val);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },
        deleteItem: function (type, id) {
            var index;
            var ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {

                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // Calculate total income and expemses
            calculateTotal('exp');

            calculateTotal('inc');

            // budget=income -expense

            data.budget = data.total.inc - data.total.exp;

            data.percentage = Math.round(data.total.exp / data.total.inc * 100);
            // calculate the income and expense
        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (current) {
                current.calculatePercentag();
            });

        },
        getPercentages: function () {
            var allPercs = data.allItems.exp.map(function (curr) {
                return cur.getPercentage();
            });
            return allPercs;
        },

        getBudget: function () {

            return {

                budget: data.budget,

                totalIncome: data.total.inc,

                totalExpenses: data.total.exp,

                percentage: data.percentage

            }
        }
    };

})();


// User Interface Controller
var userInterfaceController = (function () {
    var DOMStrings = {

        input_type: '.add__type',

        input_description: '.add__description',

        input_value: '.add__value',

        input_button: '.add__btn',

        income_container: '.income__list',

        expense_container: '.expenses__list',

        total_budget: '.budget__income__value',

        budget_value: '.budget__value',

        budget_income_value: '.budget__income--value',

        budget_expense_value: '.budget__expenses--value',

        budget_expenses_percentage: '.budget__expenses--percentage',

        container: '.container '


    };
    return {

        getInput: function () {

            return {

                type: document.querySelector(DOMStrings.input_type).value,// either inc or exp

                description: document.querySelector(DOMStrings.input_description).value,

                value: parseFloat(document.querySelector(DOMStrings.input_value).value)

            }
        },

        addlistItem: function (obj, type) {

            var html, newHtml, element;

            if (type === 'inc') {

                element = DOMStrings.income_container;

                html = '<div class="item clearfix" id="inc-%id%"> <div cla' + 'ss="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';

            }

            else if (type === 'exp') {

                element = DOMStrings.expense_container;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            newHtml = html.replace('%id%', obj.id);

            newHtml = newHtml.replace('%description%', obj.description);

            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            var something = document.querySelector(DOMStrings.total_budget);

        },
        removeListItem: function (selectorID) {
            document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID));

        },

        clearFields: function () {

            var fields, fieldsArray;


            fields = document.querySelectorAll(DOMStrings.input_description + ',' + DOMStrings.input_value);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {

                current.value = "";

            });

            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DOMStrings.budget_value).textContent = obj.budget;

            document.querySelector(DOMStrings.budget_income_value).textContent = obj.totalIncome;

            document.querySelector(DOMStrings.budget_expense_value).textContent = obj.totalExpenses;

            document.querySelector(DOMStrings.budget_expenses_percentage).textContent = obj.percentage;

        },

        getDOMStrings: function () {

            return DOMStrings;
        }
    };
})();


//App controller
var controller = (function (budgtctrl, uiCtrl) {
    // setEventListeners
    var setupEventListeners = function () {

        var DOM = uiCtrl.getDOMStrings();

        document.querySelector(DOM.input_button).addEventListener('click', ctrlAddItem);


        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13) {

                ctrlAddItem();

            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
    //console.log(typeof(budgetExpensesValues));

    var updateBudget = function () {

        var budget;

        budgtctrl.calculateBudget();

        budget = budgtctrl.getBudget();
        // display budget
        console.log(budget);

        uiCtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        // calculate percentage
        //read % from from budget controler
        // update % to ui

    }

    var ctrlAddItem = function () {
        var input, newItem;

        // 1 get input data
        input = uiCtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2 Add item item to budget controller
            newItem = budgtctrl.addItem(input.type, input.description, input.value);
            // Add it to ui
            uiCtrl.addlistItem(newItem, input.type);
            // Clear input fields
            uiCtrl.clearFields();

            updateBudget();
            // Calculate and update Budget

            updatePercentages();
        }

    };

    var ctrlDeleteItem = function (event) {

        var itemId, splitId, ID;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            splitId = itemId.split('-');
            console.log(splitId);
            type = splitId[0];
            ID = parseInt(splitId[1]);
        }
        // 1. Delete item form data structure
        budgtctrl.deleteItem(type, ID);
        // 2. Delete item from Ui
        uiCtrl.removeListItem(itemId);
        // 3. upade budget
        updateBudget();
    };

    return {

        init: function () {

            console.log('app has started');

            setupEventListeners();
        }
    }

})(budgetController, userInterfaceController);

controller.init();
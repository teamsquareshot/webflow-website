// elements
const calcModal = document.querySelector(".modal-calculator");
const btnPlus = document.querySelectorAll("#calc-plus");
const btnMinus = document.querySelectorAll("#calc-minus");
const frontData = document.querySelectorAll('span'); // all span on page
const imageCheckbox = document.querySelectorAll('.dropdown-checkbox');
const imageCheckboxChildNodes = document.querySelectorAll('.checkbox-block');
//const formData = document.forms;
let formData = [];
formData[0] = document.querySelector("#wf-form-calculator");

//modal observer
{
	// selec observer element
	let target = calcModal;
	 
	// create new constructor
	let observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		sendDataSummary();
	    //console.log(mutation.type); //for test return result
	  });    
	});
	 
	// create config to observe
	let config = { attributes: true, childList: true, characterData: true };
	 
	// start observe
	observer.observe(target,  config);
}

// data object
let summaryData = [
	 {name: "standard", index: 0, count: 0, state: false,
	 	price: {plan_a: 50, plan_b: 40, plan_c: 35}
	 },
	 {name: "paired", index: 1, count: 0, state: false,
	 	price: {plan_a: 75, plan_b: 60, plan_c: 53}
	 },
	 {name: "group", index: 2, count: 0, state: false,
	 	price: {plan_a: 150, plan_b: 120, plan_c: 105}
	 },
	 {name: "ghost_mannequin", index: 3, count: 0, state: false, 
	 	price: {plan_a: 75, plan_b: 60, plan_c: 53}
	 },
	 {name: "jewelry_watches", index: 4, count: 0, state: false,
		price: {plan_a: 100, plan_b: 80, plan_c: 70}
	 },
	 {name: "hand_model", index: 5, count: 0, state: false,
	 	price: {plan_a: 150, plan_b: 120, plan_c: 105}
	 },
	 {planType: "pay_as_you_go", value: 1, dataName: "plan_a", price: 0, state: true, planInfo: "Free of charge"},
	 {planType: "growth", value: 2, dataName: "plan_b", price: 0, state: false, 
		planInfo: {activeDiscount: "$500 per year", disableDiscount: "$350 every 6 months"},
		planPrice: {activeDiscount: 500, disableDiscount: 700}
	 },
	 {planType: "enterprise", value: 3, dataName: "plan_c", price: 0, state: false, 
		planInfo: {activeDiscount: "$2,000 per year", disableDiscount: "$1400 every 6 months"},
		planPrice: {activeDiscount: 2000, disableDiscount: 2800}
	 },
	 {name: "discount", item: 20, state: false},
	 {dataName: "image_total_count", total: 0}, 
	 {dataName: "peice_per_image", total: 0},
	 {dataName: "image_total", total: 0},
	 {dataName: 'plan_info', planPrice: 0, total: 'Free of charge'},
	 {dataName: "total", total: 0},
	 {dataName: "save", total: 0},
]

//change count 
const counterPlus = function(counterIndex) {
	counterIndex.count++
	calculator()
}

const counterMinus = function(counterIndex) {
	counterIndex.count > 0 ? counterIndex.count-- : counterIndex.count = 0;
	calculator()
}

const resetPrevState = function() {
	summaryData.forEach(item => {
		if (item.planType) {
			item.state = false
		}
	})
}

// checkbox checked
const imageChecked = function(counterIndex) {
	if (counterIndex.state != false) {
		counterIndex.count = 0; 
		counterIndex.state = false; 
	} 
	else {
		counterIndex.count = 1; 
		counterIndex.state = true;
	}	
	sendDataInputs(counterIndex) // object {name & count}
}

const checkPlanSelected = function() {
	 return summaryData.find(el => {
		if (el.planType) {
			if (el.state === true) {
				return el.dataName
			}
		}
	})
}

const imagePriceSelected = function() {
	const plan = checkPlanSelected();
	let arr = [];
	summaryData.forEach(item => {
		if (item.price && item.state === true) {
			arr.push(item.price[plan.dataName])
		}
	})
	return arr
}
	
// send data to front
const sendDataSummary = function() {
	{// send data to expand summary block and update in modal-footer section
		frontData.forEach(el => {
			let data = summaryData.find(item => {
				return item.dataName == el.dataset.name;
			})
			//find and compare data from front and in summaryData 
			if (data.dataName === el.dataset.name && data.dataName != undefined && el.dataset.name != undefined) { 
				el.innerText = data.total
			} 
		})
	}
}

// sendData to inputs in checked image types
const sendDataInputs = function(...data) {
	let frontInput = document.querySelector("input[name="+data[0].name+"]");
	data[0].value != undefined ? frontInput.value = data[0].value : frontInput.value = data[0].count;
	calculator()
}

//handele onchange form event and change different data type in summaryData
const inputEvent = function(...itemsData) {
	if (itemsData[1] != 0) { //проверка наличия второго атрибута 
		resetPrevState()
		let planValue = summaryData.find(el => {
			return el.value === itemsData[1] 
		})
		itemsData[0].forEach(el => {
			if (el.checked == true) {
				let planSelected = summaryData.find(item => {
					return item.value === Number(el.value)
				})
				planSelected.state = true;
				calculator()
			}
		})
	}
	else if (itemsData[0].name != 'discount'){
		let imageTypeName = summaryData.find(el => {
			return el.name === itemsData[0].name
		})
		imageTypeName.count = Number(itemsData[0].value) // перезаписывает значение из input в summaryData
		sendDataInputs(imageTypeName, Number(itemsData[0].value))
	}
	else if (itemsData[0].name == 'discount') { // проверка attribute name="discount"
		if (itemsData[0].checked) {
			summaryData.find(el => {
				return el.name === itemsData[0].name
			}).state = true;
			calculator();
		}
		else {
			summaryData.find(el => {
				return el.name === itemsData[0].name
			}).state = false;
			calculator();
		}
	}
	else {
		console.log('else')
	}
	//console.log(summaryData) // test 
	
}

//find all inputs
for (i = 0; i < formData[0].length; i++) {
	let data = formData[0][i];
	let elementValue = data.getAttribute('value');
	let elementName = data.getAttribute('name');
	data.setAttribute("onchange", "inputEvent("+elementName+","+ Number(elementValue)+")");
}

// find and cahnge summaryData[index].cont++
for (i = 0; i < btnPlus.length; i++) {
	btnPlus[i].setAttribute("index", i)
	btnPlus[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index')) 
		})
		counterPlus(indexItem)
		sendDataInputs(indexItem)
	})	
}
// find and cahnge summaryData[index].cont++
for (i = 0; i < btnMinus.length; i++) {
	btnMinus[i].setAttribute("index", i)
	btnMinus[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index')) 
		})
		counterMinus(indexItem); // object 
		sendDataInputs(indexItem); // object
	})	
}

//find all checked checkbox image types
for (i = 0; i < imageCheckbox.length; i++) {
	imageCheckbox[i].setAttribute("index", i)
	imageCheckboxChildNodes[i].childNodes.forEach(el => {
		el.setAttribute('index', i)
	})
	
	imageCheckbox[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index')) 
		})
		imageChecked(indexItem); // object
	})	
}

//calculator 
const calculator = function() {
	
	let imageSummaryItems = [];
	let imagePricePlan = [];
	let imageTotal = [];

	{//calculate image count
		summaryData.forEach(item => {
			if (item.count != undefined) {
				imageSummaryItems.push(item.count);
			}
		})
		
		let result = imageSummaryItems.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue)
		}, 0);
	
		summaryData.find(item => item.dataName === 'image_total_count').total = result;
		
	}
	
	{//checkPlanSelected
		let plan = checkPlanSelected(); // object
		console.log(plan)
		let getImagePrice = summaryData.forEach(el => {
				if (el.price) {
					let priceItem = el.price[plan.dataName]
					imagePricePlan.push(priceItem)
				}
			})
	}
	
	{//calculate image price & 
		for (i = 0; i < imageSummaryItems.length; i++) {
			if (imageSummaryItems[i] > 0) {
				let imagePriceSummary = imageSummaryItems[i] * imagePricePlan[i]
				imageTotal.push(imagePriceSummary)
			}
		}
		let result = imageTotal.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue)
		}, 0);
		summaryData.find(item => item.dataName === 'image_total').total = result;
	}
	
	{//show data price in summary
		let minPrice = Math.min(...imagePriceSelected());
		let maxPrice = Math.max(...imagePriceSelected());
		if (imagePriceSelected().length === 1) {
			summaryData.find(item => item.dataName === 'peice_per_image').total = minPrice; 
		}
		else if (imagePriceSelected().length > 1) {
			summaryData.find(item => item.dataName === 'peice_per_image').total = minPrice+" - $"+maxPrice
		}
		else {
			summaryData.find(item => item.dataName === 'peice_per_image').total = 0;
		}
	}
	
	{//membership plan info selected 
		let plan = checkPlanSelected();
		let discountStatus = summaryData.find(el => el.name === 'discount').state
		
		if (discountStatus === true && plan.planInfo.activeDiscount != undefined) {
			summaryData.find(item => item.dataName === 'plan_info').total = plan.planInfo.activeDiscount
			summaryData.find(item => item.dataName === 'plan_info').planPrice = plan.planPrice.activeDiscount
		}
		else if (plan.planInfo.activeDiscount == undefined) {
			summaryData.find(item => item.dataName === 'plan_info').total = plan.planInfo
			summaryData.find(item => item.dataName === 'plan_info').planPrice = 0;
		}
		else {
			summaryData.find(item => item.dataName === 'plan_info').total = plan.planInfo.disableDiscount;
			summaryData.find(item => item.dataName === 'plan_info').planPrice = plan.planPrice.disableDiscount;
		}
	}
	
	{//calculate save & total
		let plan = checkPlanSelected();
		let imageTotalSum =	summaryData.find(item => item.dataName === "image_total").total
		let planPrice = summaryData.find(item => item.dataName === "plan_info").planPrice
		let saveData = summaryData.find(item => item.dataName === 'save');
		let calcTotal = summaryData.find(item => item.dataName === 'total');
		calcTotal.total = planPrice + imageTotalSum;
		
		if (plan.value == 2) {
			let calcSave = Math.round(Number((imageTotalSum)*0.25) + Number(imageTotalSum), 1)
			calcSave - (imageTotalSum + planPrice) < 0 ? saveData.total = 0 : saveData.total = calcSave - (imageTotalSum + planPrice);
			 
		} 
		else if (plan.value == 3) {
			let calcSave = Math.round(Number((imageTotalSum)*0.42857142857142854) + Number(imageTotalSum), 1)
			calcSave - (imageTotalSum + planPrice) < 0 ? saveData.total = 0 : saveData.total = calcSave - (imageTotalSum + planPrice);
		}
		else {
			saveData.total = 0;
		}
	}
	sendDataSummary()
}

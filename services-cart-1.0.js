document.addEventListener('DOMContentLoaded', function() {
let getLocalCart = function(){return localStorage.getItem('cart');}
let itemIroning = 0;
let subTotal = 0
let skip = false
let cartBG = document.querySelector('.cart-bg')
let cartExist_e = document.querySelector('.cart-exist')
let cartEmpty_e = document.querySelector('.cart-empty')
let cartPanel = document.querySelector('.cart-panel')
let minOrderBlock = document.querySelector('.min-order-block')
var scrollPosition = 0;

function showMinOrderBlock(stat){
	if(stat){
	minOrderBlock.classList.remove("min-order-block--hide")	
	}else{
	minOrderBlock.classList.add("min-order-block--hide")		
	}	
}
	
function showCart(stat){
if(stat){
var oldWidth = $body.innerWidth();
scrollPosition = window.pageYOffset;
$body.css('overflow', 'hidden');
$body.css('position', 'fixed');
$body.css('top', `-${scrollPosition}px`);
$body.width(oldWidth);
//$('body').css("overflowY", "hidden");
cartBG.classList.remove("cart-bg-hide");
setTimeout(()=>{cartBG.classList.remove("cart-bg-opacity");cartPanel.classList.add("cart-panel-visible")},10)
}else{
if ($body.css('overflow') != 'hidden') { scrollPosition = window.pageYOffset; }
$body.css('overflow', '');
$body.css('position', '');
$body.css('top', '');
$body.width('');
$(window).scrollTop(scrollPosition);
//$('body').css("overflowY", "scroll");
cartBG.classList.add("cart-bg-opacity");cartPanel.classList.remove("cart-panel-visible")
setTimeout(()=>{cartBG.classList.add("cart-bg-hide");},1000)
}
}
function cartExist(stat){
if(stat){
cartExist_e.classList.remove("cart-exist-hide")
cartEmpty_e.classList.add("cart-empty-hide")
cartItemHead.classList.remove("head-item-hide")
}else{
cartExist_e.classList.add("cart-exist-hide")
cartEmpty_e.classList.remove("cart-empty-hide")
cartItemHead.classList.add("head-item-hide")
}
}
function clearCart(){
let scroll_block_info = document.querySelector('.scroll-block-info')
while (scroll_block_info.firstChild) {scroll_block_info.removeChild(scroll_block_info.firstChild);}
}

function delAddOns(name){
let localCart_del_ir = JSON.parse(getLocalCart())
   	localCart_del_ir.cart.forEach((cartItem)=>{
     //cartItem.steam=false
     //cartItem.steamCount=0
	 if(cartItem.addons.length>0){
		 cartItem.addons.forEach((ons, id)=>{
			 if(ons.name === name){
				 cartItem.addons.splice(id, 1);
			 }
		 })
	 }
    })
let arrIdDel =[]
localCart_del_ir.cart.forEach((cartItem, id)=>{
	if(cartItem.count===0 && cartItem.addons.length===0){
		arrIdDel.push(id)
		//localCart_del_ir.cart.splice(id, 1);
	}
})
 if(arrIdDel.length>0){
	arrIdDel.slice().reverse().forEach(id=>{
		localCart_del_ir.cart.splice(id, 1);
	})
}

itemIroning=0;subTotal=0;
if(localCart_del_ir.cart.length>0){
localStorage.setItem('cart', JSON.stringify({cart: localCart_del_ir.cart}));
//localCart = localStorage.getItem('cart');
CartFilling(getLocalCart())
}else{
localStorage.removeItem('cart');
clearCart()
cartExist(false)
navCartItem.classList.add("nav-cart-item-hide")
}


}

function delProduct(e){
let id = Number(e.target.id)
let localCart_del_pr = JSON.parse(getLocalCart())
localCart_del_pr.cart[id].count = 0;
if(localCart_del_pr.cart[id].addons.length === 0){
localCart_del_pr.cart.splice(id, 1);
}
itemIroning=0;subTotal=0;skip = false
if(localCart_del_pr.cart.length>0){
localStorage.setItem('cart', JSON.stringify({cart: localCart_del_pr.cart}));
//localCart = localStorage.getItem('cart');
CartFilling(getLocalCart())
}else{
localStorage.removeItem('cart');
clearCart()
cartExist(false)
navCartItem.classList.add("nav-cart-item-hide")
}
}
function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function createCartItem(item, id){
		itemIroning += item.steamCount
    if(item.count==="skip"){skip = true}
    if(item.count===0){return}
		subTotal +=  item.count!="skip"?item.price * item.count:0
 		var cart_item_info = document.createElement("div");
    cart_item_info.classList.add("cart-item-info");
    
    var cart_item_info_head = document.createElement("div");
    cart_item_info_head.classList.add("cart-item-info-head");
    
    var cart_item_info_head_img = document.createElement("div");
    cart_item_info_head_img.classList.add("cart-item-info-head-img");
    
    var cart_item_img = document.createElement("img");
    cart_item_img.classList.add("cart-item-img");
    cart_item_img.src = item.img;
    
    var cart_item_title = document.createElement("div");
    cart_item_title.classList.add("cart-item-title");
    cart_item_title.innerHTML = item.title;
    
    
    var cart_item_price = document.createElement("div");
    cart_item_price.classList.add("cart-item-price");
    if(item.count != "skip"){
      let val = item.price * item.count;
      if(val > 1000){
      let thous = Math.floor(val/1000)
      let rest = val-thous*1000
      let re = rest>100?rest:"0"+rest
      if(rest<10){re="00"+rest}else if(rest<100){re="0"+rest}else{re=rest}
      cart_item_price.innerHTML ="$"+ thous+","+re
      }else{cart_item_price.innerHTML = "$"+val}
    }else{
    	 cart_item_price.innerHTML ="$(TBD)"
    }
   
   
   var cart_item_pattern_info = document.createElement("div");
   cart_item_pattern_info.classList.add("cart-item-pattern-info");
   
   /*=== Pattern ===*/
   var cart_item_pattern_block_shoot = document.createElement("div");
   cart_item_pattern_block_shoot.classList.add("cart-item-pattern-block");
   var option_title_shoot = document.createElement("div");
   option_title_shoot.classList.add("option-title");
   option_title_shoot.innerHTML = "Shoot type:&nbsp;";
   var option_value_shoot = document.createElement("div");
   option_value_shoot.classList.add("option-value");
   option_value_shoot.innerHTML = ucFirst(item.shootTitle);
   
   var cart_item_pattern_block_objects = document.createElement("div");
   cart_item_pattern_block_objects.classList.add("cart-item-pattern-block");
   var option_title_objects = document.createElement("div");
   option_title_objects.classList.add("option-title");
   option_title_objects.innerHTML = "Objects in image:&nbsp;";
   var option_value_objects = document.createElement("div");
   option_value_objects.classList.add("option-value");
   option_value_objects.innerHTML = ucFirst(item.objTitle+"&nbsp;");
   
   var cart_item_pattern_block_shadow = document.createElement("div");
   cart_item_pattern_block_shadow.classList.add("cart-item-pattern-block");
   var option_title_shadow = document.createElement("div");
   option_title_shadow.classList.add("option-title");
   option_title_shadow.innerHTML = "Shadow:&nbsp;";
   var option_value_shadow = document.createElement("div");
   option_value_shadow.classList.add("option-value");
   option_value_shadow.innerHTML = ucFirst(item.shadow);
    
   var cart_item_pattern_block_number = document.createElement("div");
   cart_item_pattern_block_number.classList.add("cart-item-pattern-block");
   var option_title_number = document.createElement("div");
   option_title_number.classList.add("option-title");
   option_title_number.innerHTML = "Number of images:&nbsp;";
   var option_value_number = document.createElement("div");
   option_value_number.classList.add("option-value");
   option_value_number.innerHTML = ucFirst(item.count+"");
   /*=== Pattern end ===*/
   
   var cart_sum_pattern = document.createElement("div");
   cart_sum_pattern.classList.add("cart-sum-pattern");
   
   var sum_pattern_text = document.createElement("div");
   sum_pattern_text.classList.add("sum-pattern-text");
   sum_pattern_text.innerHTML = "$"+item.price+"/image or $"+item.enterprise+"+ for Members";
   
   var cart_item_remove = document.createElement("div");
   cart_item_remove.classList.add("cart-item-remove");
   cart_item_remove.innerHTML = "Remove";
   cart_item_remove.id=id
   cart_item_remove.addEventListener('click', delProduct)
   
   cart_item_info_head_img.append(cart_item_img) 
   cart_item_info_head_img.append(cart_item_title) 
   
   cart_item_info_head.append(cart_item_info_head_img)
   cart_item_info_head.append(cart_item_remove)
   
   cart_item_pattern_block_shoot.append(option_title_shoot)
   cart_item_pattern_block_shoot.append(option_value_shoot)
   cart_item_pattern_block_objects.append(option_title_objects)
   cart_item_pattern_block_objects.append(option_value_objects)
   cart_item_pattern_block_shadow.append(option_title_shadow)
   cart_item_pattern_block_shadow.append(option_value_shadow)
   cart_item_pattern_block_number.append(option_title_number)
   cart_item_pattern_block_number.append(option_value_number)
   
   cart_item_pattern_info.append(cart_item_pattern_block_shoot)
   if(item.objTitle){
	 cart_item_pattern_info.append(cart_item_pattern_block_objects)  
   }
   if(item.shadow){
	   cart_item_pattern_info.append(cart_item_pattern_block_shadow)
   }
   
   cart_item_pattern_info.append(cart_item_pattern_block_number)
   
   cart_sum_pattern.append(sum_pattern_text)
   
   cart_item_info.append(cart_item_info_head)
   cart_item_info.append(cart_item_pattern_info)
   cart_item_info.append(cart_item_price)
   cart_item_info.append(cart_sum_pattern)
   
   return cart_item_info
}

function createCartIroning(name, count, price){
		let cart_ironimg_info = document.createElement("div");
    cart_ironimg_info.classList.add("cart-ironimg-info");
    
    let cart_ironimg_info_head = document.createElement("div");
    cart_ironimg_info_head.classList.add("cart-ironimg-info-head");
    
    let cart_item_title = document.createElement("div");
    cart_item_title.classList.add("cart-item-title");
    cart_item_title.innerHTML = name
    
    let cart_item_price = document.createElement("div");
    cart_item_price.classList.add("cart-item-price");
     let val = count*price;
      if(val > 1000){
      let thous = Math.floor(val/1000)
      let rest = val-thous*1000
      let re = rest>100?rest:"0"+rest
      if(rest<10){re="00"+rest}else if(rest<100){re="0"+rest}else{re=rest}
      cart_item_price.innerHTML ="$"+ thous+","+re
      }else{cart_item_price.innerHTML = "$"+val}

    let cart_ironimg_count_block = document.createElement("div");
    cart_ironimg_count_block.classList.add("cart-ironimg-count-block");
    
    let option_title_ironimg = document.createElement("div");
    option_title_ironimg.classList.add("option-title");
    option_title_ironimg.innerHTML = "Number of items:&nbsp;"
    
    let option_value_ironimg = document.createElement("div");
    option_value_ironimg.classList.add("option-value");
    option_value_ironimg.innerHTML = count
    
    let cart_item_remove = document.createElement("div");
    cart_item_remove.classList.add("cart-item-remove");
    cart_item_remove.innerHTML = "Remove";
    cart_item_remove.addEventListener('click', ()=>{delAddOns(name)})
    
    cart_ironimg_info_head.append(cart_item_title)
    cart_ironimg_info_head.append(cart_item_remove)
	
    cart_ironimg_count_block.append(option_title_ironimg)
    cart_ironimg_count_block.append(option_value_ironimg)
    cart_ironimg_info.append(cart_ironimg_info_head)
    cart_ironimg_info.append(cart_ironimg_count_block)
    cart_ironimg_info.append(cart_item_price)
    return cart_ironimg_info
}


function createHR(){
let h=document.createElement("div");h.classList.add("separator");return h
}


/*********** Заполнение корзины *************/
let addOnsArr = []
function CartFilling(localCart){
if(localCart===null){return;}
let countProd=0;
itemIroning=0;subTotal=0;skip = false;
addOnsArr = []
 let localCart_fill = JSON.parse(localCart)
 let countProduct=0,countSep=0
  let scroll_block_info = document.querySelector('.scroll-block-info')
  clearCart()
  	localCart_fill.cart.forEach((cartItem)=>{
    if(cartItem.count != 0  || cartItem.count === "skip"){countProduct++}
    })
   	localCart_fill.cart.forEach((cartItem, id)=>{
		

		
		if(cartItem.addons.length>0){
			cartItem.addons.forEach(itemAddCart=>{
				let nameAddOns = itemAddCart.name
				let countAddOns = itemAddCart.count				
				let currentAddOns = addOnsArr.find(addons => addons.name === nameAddOns)				
				if(currentAddOns){
					currentAddOns.count += countAddOns
				}else{
					addOnsArr.push(itemAddCart)
				}
			})
			
		}

		let itemCart =createCartItem(cartItem, id)
		itemCart?scroll_block_info.append(itemCart):0
		if((cartItem.count != 0 || cartItem.count === "skip")){
			if(countSep<(countProduct-1)){countSep++
				scroll_block_info.append(createHR())
			}
		}
    })
	
	console.log(addOnsArr)
	if(addOnsArr.length>0){
		addOnsArr.forEach((item, id)=>{
			if(countProduct && id===0){scroll_block_info.append(createHR())}
			if(id>0){scroll_block_info.append(createHR())}
			scroll_block_info.append(createCartIroning(item.name, item.count, item.price))
			countProd++
		})
	}
    /* if(itemIroning){
     if(countProduct!=0){scroll_block_info.append(createHR())}
     	scroll_block_info.append(createCartIroning(itemIroning))
      countProd++
     } */

    if(!skip){
	let valAll = subTotal
		if(addOnsArr.length>0){
			addOnsArr.forEach((ons)=>{
				valAll += ons.count * ons.price
			})
		}

    //let valAll = subTotal + (itemIroning*3);
	
    if(valAll > 1000){
	    showMinOrderBlock(false)
    let thousAll = Math.floor(valAll/1000)
    let restAll = valAll-thousAll*1000
    let reAll
    if(restAll<10){reAll="00"+restAll}else if(restAll<100){reAll="0"+restAll}else{reAll=restAll}
    cartSubtotal.innerHTML ="SUBTOTAL: $"+ thousAll+","+reAll
    }else{cartSubtotal.innerHTML = "SUBTOTAL: $"+valAll; if(valAll <= 300){showMinOrderBlock(true)}}
    }else{
    cartSubtotal.innerHTML = "SUBTOTAL: $(TBD)";
	    showMinOrderBlock(true)
    }
    
    localCart_fill.cart.forEach((cartItem)=>{if(cartItem.count>0||cartItem.count =="skip")countProd++})
    
    cartItemHead.innerHTML = countProd>1?countProd+" items":countProd+" item"
    navCartItem.classList.remove("nav-cart-item-hide")
    navCartItem.innerHTML = countProd
    if(countProd){cartExist(true)}else{cartExist(false)}
}


if(true){
  CartFilling(getLocalCart())
}//if(localCart)


  document.querySelector('#cartClose').addEventListener('click', ()=>{
  showCart(false)
  })
  cartBG.addEventListener('click', (e)=>{
  if(e.target.classList.contains('cart-bg')){showCart(false)}
  })

cartContinue.addEventListener('click', ()=>{
let finCart={cart: []}
let AllSubtotal = 0, skip=false;
  let localCart_fin = JSON.parse(getLocalCart())
   	localCart_fin.cart.forEach((cartItem)=>{
	if(cartItem.count === 0){return}
    let title = cartItem.title.replaceAll("&amp;", "")
    title= title.replaceAll("  ", "_")
    title= title.replaceAll(" ", "_")
    let shot = cartItem.shootTitle.replaceAll("&amp;", "")
    shot= shot.replaceAll("  ", "_")
    shot= shot.replaceAll(" ", "_")
	let objName = cartItem.objTitle?cartItem.objTitle.replaceAll(" ", "_"):null
	let shadowName = cartItem.shadow?cartItem.shadow.replaceAll(" ", "_"):null
	let arrAddOns = null
	if(cartItem.addons.length>0){
		arrAddOns = JSON.parse(JSON.stringify(cartItem.addons));
		arrAddOns.forEach(ons=>{
		ons.name = ons.name.replaceAll("/", "_")
		ons.addOnsSubtotal = ons.count*ons.price
		})
	}
	
    let newItem ={
     title: title,
     count: cartItem.count,
     price: cartItem.price,
     enterprise: cartItem.enterprise,
     shoot: shot,
   	 objects: objName,
     shadow: shadowName,
	 //addOns: arrAddOns,
	 subtotal: cartItem.count==="skip"?"skip":cartItem.count*Number(cartItem.price)
     }
     finCart.cart.push(newItem)
     
    })//forEach
   /* if(itemIroning){
    finCart.cart.push({title: "Steaming/ironing", count: itemIroning, price: 3})
    }*/
	/**** Формирование Add Ons ****/
	if(addOnsArr.length>0){
		addOnsArr.forEach((item, id)=>{
			finCart.cart.push({
				title: item.name,
				count: item.count,
				//price: item.price,
				subtotal: item.count*item.price
			})
		})
	}
	
/*	localCart_fin.cart.forEach((cartItem)=>{
		if(cartItem.addons.length>0){
			cartItem.addons.forEach(itemAddCart=>{
				let nameAddOns = itemAddCart.name
				let countAddOns = itemAddCart.count				
				let currentAddOns = addOnsArr.find(addons => addons.name === nameAddOns)				
				if(currentAddOns){
					currentAddOns.count += countAddOns
				}else{
					addOnsArr.push(itemAddCart)
				}
			})
			
		}
		
	})*/
	
	finCart.cart.forEach((cartItem)=>{
		if(cartItem.subtotal==="skip"){
			skip =true;
		}else{
			AllSubtotal += cartItem.subtotal
		}
	})
	if(skip){AllSubtotal="TBD"}
	finCart.cart.push({allSubtotal:AllSubtotal})
    let param = JSON.stringify(finCart.cart)
		window.open('https://app.squareshot.com/new-request/step1?cart='+param, '_blank');
    console.log(finCart)
  })//click

window.addEventListener('opencart', ()=>{
CartFilling(getLocalCart())
showCart(true)
})
navCartBtn.addEventListener('click', ()=>{
showCart(true)
})

let params = (new URL(document.location)).searchParams; 
if(params.get("cart") === "clear"){
localStorage.removeItem('cart');
clearCart()
cartExist(false)
navCartItem.classList.add("nav-cart-item-hide")
}else if(params.get("cart")!== null){
showCart(true)
}

})//DOMContentLoaded

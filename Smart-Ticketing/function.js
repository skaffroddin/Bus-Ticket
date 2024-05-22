// Here we are storing all ticket classes
const buttons = document.querySelectorAll('.ticket')


let count = 40;
let add = 0;

const selectLimit = 4;
let countSelect = 0;

const click = 1;

let select = 0

// Here we are applying for loop on every button ticket
for (let button of buttons) {
  button.addEventListener('click', function (e) {

    if (countSelect >= selectLimit) {
      return;
    }
    countSelect += 1;

    e.target.disabled = true;

    e.target.style.backgroundColor = '#1DD100';
    e.target.style.color = 'white';

    select += 1;

    // Here we are showig which seat are booked
    const seat = document.getElementById('seat');
    const seatName = e.target.textContent;
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between');
    div.innerHTML = `
    <div>${seatName}</div>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <div>Economy</div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           <div>550</div>   <br>       
    `;

    seat.appendChild(div);

    unlockButton();

    count += - 1;
    add += 1

    // Here we are adding total price
    const total = stringToNumber('total-price')
    const totalPrice = total + 550;
    setValue('total-price', totalPrice);

    // Here we are adding grand total price
    const grand = stringToNumber('grand-total');
    const grandTotal = grand + 550;
    setValue('grand-total', grandTotal);

    // Here we setting values of remaining seats 
    setValue('remaining-seats', count);
    // Here we setting values of booked seats
    setValue('booked-seat', add);

    // Here we storing the input field id and enabling the input field
    const coupon = document.getElementsByTagName('input');
    enable('total-price', coupon);

    // Here we are doing the same thing just like input field
    const apply = document.getElementsByTagName('button');
    enable('total-price', apply);
  })
}

// This function converts string texts into numerical texts
function stringToNumber(id) {
  const element = document.getElementById(id);
  const elementText = element.innerText;
  const elementTextConversion = parseInt(elementText);
  return elementTextConversion;
}

// This function enabling the disabled elements
function enable(id, elements) {
  const price = document.getElementById(id).innerText;
  const priceValue = parseInt(price);

  if (priceValue === 2200) {
    for (let element of elements) {
      element.removeAttribute('disabled');
    }

  }
}

// This function is used for providing discounts
function useCoupon(id) {

  // Here we are storing the dynamic id
  const input = document.getElementById(id);
  const inputValue = input.value;

  // Here we are creating the div element
  const div = document.createElement('div');

  // Here we are storing the section id where we will show the discounted price
  const discount = document.getElementById('discount');

  // Here we are storing the id of that section that we have to hide after applying coupon
  let hide = document.getElementById('hide-it');

  // Here we are storing the total price element id for calculation
  const totalPrice = document.getElementById('total-price').innerText;
  let total = parseInt(totalPrice);

  // Here we are storing the id of grand total for calculations and deducting the discounted price from grand total
  const grand = document.getElementById('grand-total').innerText;
  let grandTotal = parseInt(grand);

  // Here we are clearing the input field
  input.value = '';

  // Here we are adding some tailwind classes for showing discounted price
  div.classList.add('font-medium', 'flex', 'justify-between', 'mt-5');

  // Here we are applying the coupon condition
  if (inputValue === "NEW15") {
    // Here we are calculating the total price 15% 
    total = total - (total * 0.85)
    div.innerHTML = `
    <div>Discounted Price</div>           <div>${total}</div>
    `;

    // Here we are deducting the discounted 15% price from grand total
    let finalPrice = grandTotal - total
    setValue('grand-total', finalPrice);

    // Here we are hiding the coupon section after applying coupon code
    hide.classList.add('hidden');
  }

  // Here we are applying the another coupon condition  
  else if (inputValue === "Couple 20") {
    // Here we are calculating the total price 20% 
    total = total - (total * 0.20)
    div.innerHTML = `
    <div>Discounted Price</div>           <div>${total}</div>
    `;

    // Here we are deducting the discounted 20% price from grand total
    let finalPrice = grandTotal - total
    setValue('grand-total', finalPrice);

    // Here we are hiding the coupon section after applying coupon code
    hide.classList.add('hidden');
  }

  // Here we are showing the alert if user entered wrong coupon 
  else {
    alert('Lol, Don\'try to be smart');
  }

  // Here we appending the div element to the discount section 
  discount.appendChild(div);
}

// This function sets the value of elements
function setValue(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
}

// Here we storing length of number for comparing to the input field number
const valueLength = 10;

// Here we storing the phone number input field id
const phoneNumber = document.getElementById('ph-no');
phoneNumber.addEventListener('keyup', function (e) {
  unlockButton();
})


// This function checks the we booked a seat and providing our contact number for enabling the next button
function unlockButton() {
  const phoneNumber = document.getElementById('ph-no').value;
  const numberLength = phoneNumber.length === valueLength;
  const clicked = select > 0;

  const nextButton = document.getElementById('next');

  if (numberLength && clicked) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}
let mainEl = document.querySelector('main');
console.log(mainEl);

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.

mainEl.style.backgroundColor = '#4a4e4d'

// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
// mainEl.textContent = 'DOM Manipulation'
mainEl.innerHTML = 'DOM Manipulation'

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');

// Part 2:


// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl
const topMenuEl = document.querySelector('#top-menu');

// Set the height of the topMenuEl element to be 100%
topMenuEl.style.height = '100%';

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add a class of flex-around to topMenuEl
topMenuEl.classList.add('flex-around');

// Part 3:
// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

//   Iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach(link => {
    // Create an <a> element
    const linkElement = document.createElement('a');

    // Set the href attribute with its value set to the href property of the link object
    linkElement.setAttribute('href', link.href);

    // Set the content of the <a> element to the value of the text property of the link object
    linkElement.textContent = link.text;

    // Append the new <a> element to the topMenuEl element
    topMenuEl.appendChild(linkElement);
});

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.querySelector('#sub-menu');

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = '100%';

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// // Set the CSS position property of subMenuEl to the value of absolute
subMenuEl.style.position = 'absolute';

// // Set the CSS top property of subMenuEl to the value of 0
subMenuEl.style.top = '0';

// Part 4: Adding Menu Interaction
// Select and cache all of the <a> elements inside of topMenuEl in a variable named topMenuLinks
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Attach a delegated 'click' event listener to topMenuEl
topMenuEl.addEventListener('click', function(event) {
  // Call the event object's preventDefault() method
  event.preventDefault();

  // Immediately return if the element clicked was not an <a> element
  if (!event.target.matches('a')) return;

  // Log the content of the <a> to verify the handler is working
  console.log(event.target.textContent);

  // Toggle the active class for the clicked <a> element
  event.target.classList.toggle('active');

  // Remove the active class from each <a> element in topMenuLinks
  topMenuLinks.forEach(link => {
    if (link !== event.target) {
      link.classList.remove('active');
    }
  });

  // Get the "link" object corresponding to the clicked <a> element from menuLinks
  const linkObject = menuLinks.find(link => link.text === event.target.textContent.toLowerCase());

  // If the clicked <a> element does not yet have a class of "active"
  if (!event.target.classList.contains('active')) {
    // Set the CSS top property of subMenuEl to 0
    subMenuEl.style.top = '0';
  } else {
    // If the "link" object has a subLinks property
    if (linkObject.subLinks) {
      // Set the CSS top property of subMenuEl to 100%
      subMenuEl.style.top = '100%';

      // Build the submenu based on the subLinks array of the clicked link
      buildSubmenu(linkObject.subLinks);
    } else {
      // Otherwise, set the CSS top property of subMenuEl to 0
      subMenuEl.style.top = '0';
    }
  }
});

// Helper function to build submenu
function buildSubmenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';

  // Iterate over the subLinks array and create <a> elements for each link object
  subLinks.forEach(link => {
    // Create an <a> element
    const subLinkElement = document.createElement('a');
  
    // Add an href attribute to the <a>, with the value set by the href property of the link object
    subLinkElement.setAttribute('href', link.href);
  
    // Set the content of the <a> element to the value of the text property of the link object
    subLinkElement.textContent = link.text;
  
    // Append the new <a> element to the subMenuEl
    subMenuEl.appendChild(subLinkElement);
  });
}

// Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', function(event) {
    // Call the event object's preventDefault() method
    event.preventDefault();
  
    // Immediately return if the element clicked was not an <a> element
    if (!event.target.matches('a')) return;
  
    // Log the content of the <a> to verify the handler is working
    console.log(event.target.textContent);
  
    // Set the CSS top property of subMenuEl to 0
    subMenuEl.style.top = '0';
  
    // Remove the active class from each <a> element in topMenuLinks
    topMenuLinks.forEach(link => {
      link.classList.remove('active');
    });
  
    // Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl
    if (event.target.textContent.toLowerCase() === 'about') {
      mainEl.innerHTML = '<h1>About</h1>';
    } else {
      mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    }
  });
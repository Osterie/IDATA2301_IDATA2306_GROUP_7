// Factory which creates different html elements.
class ElementFactory {
  constructor(style) {
    this.draggable = null;
    this._strictMode = true;
    this.draggableParent = null;
    if (style) {
      this._elemAttributes = style;
    } else {
      this._elemAttributes = {
        // fontSize: '12px'
      };
    }
  }

  // Makes element draggable (does not work anymore i believe).
  makeDraggable(strictMode = true, parent = null) {
    this.draggable = true;
    this._strictMode = strictMode;
    this.draggableParent = parent;
  }

  // Sets the parent for the draggable element.
  setDraggableParent(parent) {
    this.draggableParent = parent;
  }

  // Creates an empty div.
  createDiv(style = {}, id = "", className = "") {
    const div = document.createElement("div");
    if (id) {
      div.id = id;
    }
    if (className) {
      div.classList.add(className);
    }
    this._applySettings(div);
    this._applyGivenStyling(div, style);
    return div;
  }

  // Creates a HTML canvas.
  createCanvas(id, className) {
    const canvas = document.createElement("canvas");
    if (id) {
      canvas.id = id;
    }
    if (className) {
      canvas.classList.add(className);
    }
    return canvas;
  }

  // Creates a button with a given text for the button.
  // The given callback is called on buttonclick
  createButton(buttonText, callback) {
    const ctrl = document.createElement("button");
    ctrl.innerHTML = buttonText;
    ctrl.addEventListener("click", () => {
      callback();
    });
    ctrl.style.margin = "2px";
    this._applySettings(ctrl);
    return ctrl;
  }

  // Creates a color chaning button class.
  createColorChangingButton(
    buttonText,
    callback,
    color,
    defaultColor,
    clicksToChangeBackColor = 1
  ) {
    const button = new ColorChangingButton(
      buttonText,
      callback,
      color,
      defaultColor,
      clicksToChangeBackColor
    );
    this._applySettings(button.get());
    return button;
  }

  createButtonWithIcon(
    buttonText,
    iconName,
    callback,
    colorToChangeTo,
    defaultColor,
    clicksToChangeBackColor = 0
  ) {
    return new ButtonWithIcon(
      buttonText,
      iconName,
      callback,
      colorToChangeTo,
      defaultColor,
      clicksToChangeBackColor
    );
  }

  // Creates a checkbox with a given label.
  createCheckBox(label, callback, checked = false) {
    return new CheckBox(callback, label, checked);
  }

  // Creates an input element with .
  createInput(defaultText, callback = "none") {
    const ctrl = document.createElement("input");
    ctrl.value = defaultText;
    if (callback != "none") {
      ctrl.addEventListener("change", () => {
        callback();
      });
    }
    this._applySettings(ctrl);
    return ctrl;
  }

  // Creates a number input.
  createNumberInput(defaultValue, fromValue, toValue, callback = "none") {
    const ctrl = document.createElement("input");
    ctrl.type = "number";
    ctrl.value = defaultValue;
    ctrl.min = fromValue;
    ctrl.max = toValue;
    if (callback != "none") {
      ctrl.addEventListener("change", () => {
        callback();
      });
    }
    this._applySettings(ctrl);
    return ctrl;
  }

  // Creates a number input class.
  createNumberInputClass(min, max, callback = "", initialValue = 0) {
    return new NumberInput(callback, initialValue, min, max);
  }

  // Creates a slider from a min value to a max value.
  // callback is the callback called when the slider value is changed
  createSlider(label, min, max, initialValue, callback) {
    const sliderContainer = document.createElement("div");

    const labelElem = document.createElement("label");
    labelElem.textContent = label;
    sliderContainer.appendChild(labelElem);

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.value = initialValue;
    slider.step = 0.1;
    sliderContainer.appendChild(slider);

    const valueElem = document.createElement("span");
    valueElem.textContent = initialValue.toFixed(1);
    sliderContainer.appendChild(valueElem);

    slider.addEventListener("input", () => {
      const value = parseFloat(slider.value);
      valueElem.textContent = value.toFixed(1);
      callback(value);
    });

    return sliderContainer;
  }

  // Creates a slider with a label.
  // This uses the slider class, which has some useful methods
  createSliderClass(label, min, max, initialValue, callback) {
    return new Slider(initialValue, label, min, max, callback);
  }

  // Creates a h2 header with the given text.
  createHeader(text) {
    const header = document.createElement("h2");
    header.textContent = text;
    this._applySettings(header);
    return header;
  }

  // Creates a bold label with font size 16.
  createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    this._applySettings(label);
    return label;
  }

  // Creates a break.
  createBreak() {
    const br = document.createElement("br");
    return br;
  }

  // Creates a dropdown with the given options.
  createDropDown(options, callback) {
    const select = document.createElement("select");
    for (const option of options) {
      const opt = document.createElement("option");
      opt.value = option;
      opt.text = option;
      select.appendChild(opt);
    }
    select.addEventListener("change", () => {
      callback(select.value);
    });
    return select;
  }

  createHamburgerMenu() {
    return new HamburgerMenu();
  }

  // Creates a radio button.
  createRadioButton(name, value, label, callback, checked = false) {
    return new RadioButton(callback, value, name, label, checked);
  }

  // Applies the given styling to the given element.
  _applyGivenStyling(element, style) {
    for (const attribute in style) {
      const value = style[attribute];
      element.style[attribute] = value;
    }
    return element;
  }

  // Applies default styling and makes the given element draggable.
  // if the draggable fields is true
  _applySettings(element) {
    this._applyDefaultStyling(element);
    if (this.draggable) {
      this._makeDraggable(element);
    }

    return element;
  }

  // Applies default styling to the given element.
  _applyDefaultStyling(element) {
    for (const attribute in this._elemAttributes) {
      const value = this._elemAttributes[attribute];
      element.style[attribute] = value;
    }
    return element;
  }
}

// Base class for creating custom elements.
class CustomElement {
  static imgRootPath = "./assets/images/";

  constructor() {
    this.container = document.createElement("div");
    this.containerDisplay = "block"; // Used to hide/show the element and keep track of the display property
  }

  static setImgRootPath(path) {
    CustomElement.imgRootPath = path;
  }

  // Returns the container element.
  get() {
    return this.container;
  }

  // Sets the title of the element (tooltip).
  setTitle(title) {
    this.container.title = title;
  }

  // Toggles the visibility of the element.
  toggleVisibility() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Hides the element.
  hide() {
    if (this.container.style.display != "none") {
      this.containerDisplay = this.container.style.display;
    }
    this.container.style.display = "none";
  }

  // Shows the element.
  show() {
    this.container.style.display = this.containerDisplay;
  }

  // Returns true if the element is visible.
  isVisible() {
    return this.container.style.display !== "none";
  }

  // General method to get the computed style of an element
  _getComputedStyle(element, pseudoElement = null) {
    return window.getComputedStyle(element, pseudoElement);
  }
}

// Extend the base class to create a custom hamburger menu.
class HamburgerMenu extends CustomElement {
  constructor() {
    super();

    this.container.classList.add("hamburger-menu-container");

    this.hamburgerMenu = this._createHamburgerIcon();
    this.container.appendChild(this.hamburgerMenu);

    this.popupMenu = this._createPopupMenu();
    this.container.appendChild(this.popupMenu);

    this.hamburgerMenu.addEventListener("click", () => this.toggleMenu());
  }

  // Creates the icon for the hamburger menu. (three horizontal lines parallel to each other)
  _createHamburgerIcon() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "30px";
    container.style.height = "30px";

    const svgIcon = this._createSvgIcon();
    container.appendChild(svgIcon);

    return container;
  }

  // Creates the SVG element for the hamburger icon.
  // Also an event listener is added which hides the menu popup if the user clicks outside the menu.
  _createSvgIcon() {
    // Create the SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ham hamRotate ham1");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "80");
    svg.addEventListener("click", function () {
      this.classList.toggle("active");
    });

    // Add event listener to hide the menu when clicking outside the menu
    document.addEventListener("click", (event) => {
      if (
        this.isVisibileMenuPopup() &&
        !this.container.contains(event.target)
      ) {
        this.hideMenuPopup();
        svg.classList.remove("active");
      }
    });

    // Create the top path
    const topPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    topPath.setAttribute("class", "line top");
    topPath.setAttribute(
      "d",
      "m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
    );

    // Create the middle path
    const middlePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    middlePath.setAttribute("class", "line middle");
    middlePath.setAttribute("d", "m 30,50 h 40");

    // Create the bottom path
    const bottomPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    bottomPath.setAttribute("class", "line bottom");
    bottomPath.setAttribute(
      "d",
      "m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
    );

    // Append the paths to the SVG element
    svg.appendChild(topPath);
    svg.appendChild(middlePath);
    svg.appendChild(bottomPath);

    return svg;

    // The above code is equal to
    // '
    // <svg class="ham hamRotate ham1" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
    // <path
    //         class="line top"
    //         d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
    // <path
    //         class="line middle"
    //         d="m 30,50 h 40" />
    // <path
    //         class="line bottom"
    //         d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
    // </svg>
    // '
  }

  // Creates the popup menu for the hamburger menu.
  _createPopupMenu() {
    const popupMenu = document.createElement("ul");
    popupMenu.style.display = "none";
    popupMenu.style.position = "absolute";
    popupMenu.style.top = "10px";
    popupMenu.style.left = "0px";
    popupMenu.style.zIndex = 10000;
    popupMenu.className = "menu-popup";
    return popupMenu;
  }

  // Adds a menu item to the popup menu.
  // label: the text of the menu item
  // onClick: the callback called when the menu item is clicked
  addMenuItem(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", onClick);
    this.popupMenu.appendChild(button);
  }

  // Toggles the menu visibility
  toggleMenu() {
    if (this.isVisibileMenuPopup()) {
      this.hideMenuPopup();
    } else {
      this.showMenuPopup();
    }
  }

  // Shows the menu that pops up
  showMenuPopup() {
    this.popupMenu.style.display = "flex";
  }

  // Hides the menu that pops up
  hideMenuPopup() {
    this.popupMenu.style.display = "none";
  }

  // Returns true if the menu popup is visible
  isVisibileMenuPopup() {
    return this.popupMenu.style.display !== "none";
  }
}

class ToolTip extends CustomElement {
  constructor(text, parentButton) {
    super();

    this.timeoutID = null;

    this.container.classList.add("tooltiptext");

    this.toolTipText = document.createElement("span");
    this.toolTipText.textContent = text;
    this.container.appendChild(this.toolTipText);

    parentButton.appendChild(this.container);

    this.hide();
  }

  show() {
    super.show();

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }

    this.timeoutID = setTimeout(() => {
      this.hide();
    }, 500);
  }

  // Sets the text of the tooltip.
  setText(text) {
    this.container.textContent = text;
  }
}

// Class for making input elements.
class InputElement extends CustomElement {
  constructor(callback = "", initialValue = "") {
    super();

    this.input = document.createElement("input");

    this.setValue(initialValue);
    this.container.appendChild(this.input);
    this.setCallback(callback);
  }

  // Sets the value of the input.
  setValue(value) {
    this.input.value = value;
  }

  // Returns the value of the input.
  getValue() {
    return this.input.value;
  }

  // Sets the callback for the input, which is called when the input value is changed.
  setCallback(callback) {
    this.callback = callback;

    if (this.callback != "") {
      this.input.removeEventListener("input", this.callback);
      this.input.addEventListener("input", (event) => {
        const value = this._getValueFromEvent(event);
        this.callback(value);
      });
    }
  }

  // Returns the value from the event caused by the input event.
  _getValueFromEvent(event) {
    return event.target.value;
  }
}

// Creates a radio button.
class RadioButton extends InputElement {
  // name: the name of the radio button group
  // value: the value of the radio button
  // label: the label of the radio button
  // callback: the callback called when the radio button is clicked
  // checked: whether the radio button is checked or not
  constructor(callback = "", value, name, label, checked = false) {
    super(callback, value);

    this.input.type = "radio";
    this.input.name = name;
    this.input.checked = checked;

    this.radioLabel = document.createElement("label");
    this.setLabel(label);

    this.container.appendChild(this.radioLabel);
  }

  setLabel(label) {
    this.radioLabel.textContent = label;
  }

  setChecked(checked) {
    this.input.checked = checked;
  }

  // Returns true or false if the radio button is checked or not.
  isChecked() {
    return this.input.checked;
  }
}

// Creates a checkbox
class CheckBox extends InputElement {
  constructor(callback = "", checkBoxLabel, checked = false) {
    super(callback);

    this.input.type = "checkbox";

    this.checkBoxLabel = document.createElement("label");
    this.checkBoxLabel.textContent = checkBoxLabel;

    this.setChecked(checked);

    this.container.appendChild(this.checkBoxLabel);
  }

  // Sets the checked state of the checkbox.
  // checked: true or false (checked or unchecked)
  setChecked(checked) {
    this.input.checked = checked;
  }

  // Returns true or false if the checkbox is checked or not.
  isChecked() {
    return this.input.checked;
  }

  isEnabled() {
    return !this.input.disabled;
  }

  // Enables the checkbox.
  enable() {
    this.input.disabled = false;
  }

  // Disables the checkbox.
  disable() {
    this.input.disabled = true;
  }

  // Returns the value from the event caused by the input event.
  // In this class the value is a boolean value (true or false) for if the checkbox is checked or not.
  _getValueFromEvent(event) {
    return event.target.checked;
  }
}

// Base class for creating custom elements that only use number values as input.
class NumberInputElement extends InputElement {
  // initialValue: the initial value of the input element
  // min: the minimum value of the input element (if null no min value is set)
  // max: the maximum value of the input element (if null no max value is set)
  // step: the step value of the input element
  constructor(
    callback = "",
    initialValue = 0,
    min = null,
    max = null,
    step = 1
  ) {
    super(callback, initialValue);

    this.setMin(min);
    this.setMax(max);
    this.setStep(step);
  }

  // Sets the value of the input element.
  setValue(value) {
    if (!this._isValidNumber(value)) {
      throw new Error("Invalid value for input element");
    }
    super.setValue(value);
  }

  // Returns the value of the input element as a float.
  getValue() {
    return parseFloat(this.input.value);
  }

  // Sets the min value of the input element.
  // if min is not a valid number an error is thrown
  setMin(min) {
    if (!this._isValidNumber(min)) {
      throw new Error("Invalid min for input element");
    }
    this.input.min = min;
    if (this.getValue() < min) {
      this.setValue(min);
    }
  }

  // Returns the min value of the input element.
  getMin() {
    return this.input.min;
  }

  // Sets the max value of the input element.
  // if max is not a valid number an error is thrown
  setMax(max) {
    if (!this._isValidNumber(max)) {
      throw new Error("Invalid max for input element");
    }
    this.input.max = max;
    if (this.getValue() > max) {
      this.setValue(max);
    }
  }

  // Returns the max value of the input element.
  getMax() {
    return this.input.max;
  }

  // Sets the step value of the input element.
  // if step is not a valid number an error is thrown
  setStep(step) {
    if (!this._isValidNumber(step)) {
      throw new Error("Invalid step for input element");
    }
    this.input.step = step;
  }

  // Returns the step value of the input element.
  getStep() {
    let step = 0.1;
    if (this.input.step) {
      step = parseFloat(this.input.step);
    }
    return step;
  }

  // Returns true if the given value is a valid number.
  _isValidNumber(value) {
    return !isNaN(value) && value !== "" && Math.abs(value) !== Infinity;
  }

  // Returns the value from the event caused by the input event.
  // Overrides the parent method to return a float value instead of string value
  _getValueFromEvent(event) {
    return parseFloat(event.target.value);
  }
}

// Creates a number input.
class NumberInput extends NumberInputElement {
  constructor(
    callback = "",
    initialValue = 0,
    min = null,
    max = null,
    step = 0.1
  ) {
    super(callback, initialValue, min, max, step);
    this.input.type = "number";
  }
}

// Creates a slider.
class Slider extends NumberInputElement {
  // label: the text to the left of the slider
  // min: the minimum value of the slider
  // max: the maximum value of the slider
  // initialValue: the initial value of the slider
  // callback: the callback called when the slider value is changed
  constructor(
    label,
    callback = "",
    initialValue = 0,
    min = null,
    max = null,
    step = 0.1
  ) {
    super(callback, initialValue, min, max, step);

    this._applyContainerStyle();

    this.input.type = "range";
    this.input.style.flexGrow = "1";
    this.input.style.width = "100%";

    this.labelElement = document.createElement("label");
    this.labelElement.textContent = label;
    this.container.insertBefore(this.labelElement, this.input);

    this.sliderValueLabel = document.createElement("span");
    this.sliderValueLabel.textContent = initialValue.toFixed(1);
    this.sliderValueLabel.style.marginLeft = "5px";
    this.sliderValueLabel.style.marginRight = "5px";

    this.sliderAndValueContainer = this._createSliderWithValueElement();

    this.container.appendChild(this.sliderAndValueContainer);

    this.input.addEventListener("input", (event) => {
      const value = this._getValueFromEvent(event);
      this.sliderValueLabel.textContent = value.toFixed(1);
    });
  }

  // Sets the value of the slider.
  setValue(value) {
    const numberOfDecimals = this._getDecimalCount(this.getStep());

    value = parseFloat(value);
    value = value.toFixed(numberOfDecimals);

    super.setValue(value);
    if (this.sliderValueLabel) {
      this.sliderValueLabel.textContent = value;
    }
  }

  // Hides the value of the slider.
  hideValue() {
    this.sliderValueLabel.style.display = "none";
  }

  // Returns the label element of the slider.
  getLabelElement() {
    return this.labelElement;
  }

  getSliderWithValueElement() {
    return this.sliderAndValueContainer;
  }

  // Returns a container with the input and the input's slider label.
  _createSliderWithValueElement() {
    const sliderAndValueContainer = document.createElement("div");
    sliderAndValueContainer.style.display = "flex";
    sliderAndValueContainer.style.alignItems = "center";
    sliderAndValueContainer.style.width = "100%";

    sliderAndValueContainer.appendChild(this.input);
    sliderAndValueContainer.appendChild(this.sliderValueLabel);
    return sliderAndValueContainer;
  }

  // Returns the number of decimals for the given value.
  _getDecimalCount(value) {
    if (!Number.isFinite(value)) return 0; // Handle non-finite numbers
    const valueString = Math.abs(value).toString(); // Handle negative values
    const decimalPart = valueString.split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  }

  // Applies the container style for the slider.
  _applyContainerStyle() {
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";
    this.container.style.width = "100%";
    this.container.style.boxSizing = "border-box"; // Ensure padding/border is included in width
  }
}

// Creates a slider with a number input to it's rigth for more precise value selecting
// class SliderWithNumberInput extends CustomElement{

//     constructor(initialValue, label, min, max, callback, step = 0.1){
//         super();

//         this.container.style.display = 'flex',
//         this.container.style.flexDirection = 'row',
//         this.container.style.flex = 1,
//         this.container.style.justifyContent = 'center',
//         this.container.style.alignItems = 'center'

//         this._initSlider(initialValue, label, min, max, callback, step);
//         this._initNumberInput(initialValue, min, max, callback, step);

//         this.slider.getSliderWithValueElement().appendChild(this.numberInput.get())

//         this.container.appendChild(this.slider.get())
//     }

//     // Initializes the slider.
//     _initSlider(initialValue, label, min, max, callback, step = 0.1){
//         this.slider = new Slider(label, callback, initialValue, min, max, step);
//         this.slider.hideValue();

//         this.slider.get().addEventListener('input', (event) => {
//             let value = parseFloat(event.target.value);
//             // value = parseFloat(value.toFixed(1));
//             if (isNaN(value)){
//                 return;
//             }
//             if (this.numberInput.getValue() != value){
//                 this.numberInput.setValue(value);
//             }
//         });
//     }

//     // Initializes the number input.
//     _initNumberInput(initialValue, min, max, callback, step = 0.1){
//         this.numberInput = new NumberInput(callback, initialValue, min, max, step);

//         this.numberInput.get().style.display = 'flex';
//         this.numberInput.get().style.flex = 1;
//         this.numberInput.get().style.justifyContent = 'stretch';
//         this.numberInput.get().style.alignItems = 'stretch';

//         this.numberInput.get().addEventListener('input', (event) => {
//             let value = parseFloat(event.target.value);
//             // value = parseFloat(value.toFixed(1));
//             if (isNaN(value)){
//                 return;
//             }
//             if (this.slider.getValue() != value){
//                 this.slider.setValue(value);
//             }
//         });
//     }

//     // Returns the value of the slider/number input.
//     getValue(){
//         let value;
//         if (this.numberInput){
//             value = this.numberInput.getValue();;
//         }
//         else if (this.slider){
//             value = this.slider.getValue();
//         }
//         else {
//             throw new Error('No value found for slider with number input');
//         }
//         return value;
//     }

//     // Sets the value of the slider/number input.
//     setValue(value){
//         this.slider.setValue(value)
//         this.numberInput.setValue(value)
//     }

//     // Sets the max value of the slider/number input.
//     setMax(max){
//         this.slider.setMax(max);
//         this.numberInput.setMax(max);
//         if (this.getValue() > max){
//             this.setValue(max);
//         }
//     }

//     // Returns the max value of the slider/number input.
//     getMax(){
//         return this.slider.getMax()
//     }

//     // Sets the min value of the slider/number input.
//     setMin(min){
//         this.slider.setMin(min);
//         this.numberInput.setMin(min);
//         if (this.getValue() < min){
//             this.setValue(min);
//         }
//     }

//     // Returns the min value of the slider/number input.
//     getMin(){
//         return this.slider.getMin()
//     }

//     // Sets the step value of the slider/number input.
//     setStep(step){
//         this.slider.setStep(step);
//         this.numberInput.setStep(step);
//     }

//     // Sets the style for the slide label
//     setStyleSliderLabel(style){
//         for (const attribute in style) {
//             const value = style[attribute]
//             this.slider.getLabelElement().style[attribute] = value
//         }
//     }
// }

class DualRangeSlider extends CustomElement {
  constructor(label, min, max, callback, step = 0.1) {
    super();

    this.container.classList.add("dual-range-slider-container");

    const labelElement = document.createElement("div");
    labelElement.classList.add("dual-range-slider-control");
    labelElement.textContent = label;
    labelElement.style.textAlign = "center";

    this.fromSlider = null;
    this.toSlider = null;
    const slidersControl = this._createSlidersControl(min, max, step);

    this.fromInput = null;
    this.toInput = null;
    const numberInputsControl = this._createNumberInputsControl(min, max, step);

    this.container.appendChild(labelElement);
    this.container.appendChild(slidersControl);
    this.container.appendChild(numberInputsControl);

    this._fillSlider(
      this.fromSlider,
      this.toSlider,
      "#C6C6C6",
      "#25daa5",
      this.toSlider
    );
    this._setToggleAccessible(this.toSlider, this.toSlider);

    this.fromSlider.addEventListener("input", () => {
      this._controlFromSlider(this.fromSlider, this.toSlider, this.fromInput);
    });
    this.toSlider.addEventListener("input", () => {
      this._controlToSlider(this.fromSlider, this.toSlider, this.toInput);
    });
    this.fromInput.addEventListener("change", () => {
      this._controlFromInput(
        this.fromSlider,
        this.fromInput,
        this.toInput,
        this.toSlider
      );
    });
    this.toInput.addEventListener("change", () => {
      this._controlToInput(
        this.toSlider,
        this.fromInput,
        this.toInput,
        this.toSlider
      );
    });

    this.fromSlider.addEventListener("change", (event) => {
      const minValue = parseFloat(event.target.value);
      const maxValue = parseFloat(this.toInput.value);
      callback(minValue, maxValue);
    });
    this.fromInput.addEventListener("change", (event) => {
      const minValue = parseFloat(event.target.value);
      const maxValue = parseFloat(this.toInput.value);
      callback(minValue, maxValue);
    });

    this.toSlider.addEventListener("change", (event) => {
      const minValue = parseFloat(this.fromInput.value);
      const maxValue = parseFloat(event.target.value);
      callback(minValue, maxValue);
    });
    this.toInput.addEventListener("change", (event) => {
      const minValue = parseFloat(this.fromInput.value);
      const maxValue = parseFloat(event.target.value);
      callback(minValue, maxValue);
    });
  }

  getMinValue() {
    return parseFloat(this.fromInput.value);
  }

  getMaxValue() {
    return parseFloat(this.toInput.value);
  }

  setMinValue(minValue) {
    if (minValue >= parseFloat(this.fromInput.min)) {
      this.fromInput.value = minValue;
      this.fromSlider.value = minValue;
    }
  }

  setMaxValue(maxValue) {
    if (maxValue <= parseFloat(this.toInput.max)) {
      this.toInput.value = maxValue;
      this.toSlider.value = maxValue;
    }
  }

  setMin(minValue) {
    this.fromSlider.min = minValue;
    this.fromInput.min = minValue;
    this.toSlider.min = minValue;
    this.toInput.min = minValue;
    if (parseFloat(this.fromInput.value) < minValue) {
      this.fromInput.value = minValue;
    }
    if (parseFloat(this.fromSlider.value) < minValue) {
      this.fromSlider.value = minValue;
    }
  }

  setMax(maxValue) {
    this.toSlider.max = maxValue;
    this.toInput.max = maxValue;
    this.fromSlider.max = maxValue;
    this.fromInput.max = maxValue;
    if (parseFloat(this.toInput.value) > maxValue) {
      this.toInput.value = maxValue;
    }
    if (parseFloat(this.toSlider.value) > maxValue) {
      this.toSlider.value = maxValue;
    }
  }

  showSliderBar() {
    this.fromSlider.style.height = "1px";
    this.toSlider.style.height = "1px";
  }

  hideSliderBar() {
    this.fromSlider.style.height = "0px";
    this.toSlider.style.height = "0px";
  }

  // changeSliderBallToLine(){
  //     this.fromSlider.classList.add('dual-range-slider-line')
  //     this.toSlider.classList.add('dual-range-slider-line')
  //     this.fromSlider.classList.remove('dual-range-slider')
  //     this.toSlider.classList.remove('dual-range-slider')
  // }

  // Creating elements

  _createSlidersControl(min, max, step) {
    const slidersControl = document.createElement("div");
    slidersControl.classList.add("dual-range-slider-control");

    this.fromSlider = document.createElement("input");
    this.fromSlider.classList.add("dual-range-slider");
    this.fromSlider.id = "fromSlider";
    this.fromSlider.type = "range";
    this.fromSlider.min = min;
    this.fromSlider.max = max;
    this.fromSlider.value = min;
    this.fromSlider.step = step;

    this.toSlider = document.createElement("input");
    this.toSlider.classList.add("dual-range-slider");
    this.toSlider.id = "toSlider";
    this.toSlider.type = "range";
    this.toSlider.min = min;
    this.toSlider.max = max;
    this.toSlider.value = max;
    this.toSlider.step = step;

    slidersControl.appendChild(this.fromSlider);
    slidersControl.appendChild(this.toSlider);

    return slidersControl;
  }

  _createNumberInputsControl(min, max, step) {
    const numberInputsControl = document.createElement("div");
    numberInputsControl.classList.add("dual-range-slider-form-control");

    const formControlContainerMin = document.createElement("div");
    const formControlLabelMin = document.createElement("div");
    formControlLabelMin.textContent = "Min";

    this.fromInput = document.createElement("input");
    this.fromInput.classList.add("dual-range-slider-number-input");
    this.fromInput.id = "fromInput";
    this.fromInput.type = "number";
    this.fromInput.value = min;
    this.fromInput.min = min;
    this.fromInput.max = max;
    this.fromInput.step = step;

    formControlContainerMin.appendChild(formControlLabelMin);
    formControlContainerMin.appendChild(this.fromInput);

    const formControlContainerMax = document.createElement("div");
    const formControlLabelMax = document.createElement("div");
    formControlLabelMax.textContent = "Max";

    this.toInput = document.createElement("input");
    this.toInput.classList.add("dual-range-slider-number-input");
    this.toInput.id = "toInput";
    this.toInput.type = "number";
    this.toInput.value = max;
    this.toInput.min = min;
    this.toInput.max = max;
    this.toInput.step = step;

    formControlContainerMax.appendChild(formControlLabelMax);
    formControlContainerMax.appendChild(this.toInput);

    numberInputsControl.appendChild(formControlContainerMin);
    numberInputsControl.appendChild(formControlContainerMax);
    return numberInputsControl;
  }

  _controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this._getParsed(fromInput, toInput);
    this._fillSlider(fromInput, toInput, "#C6C6C6", "#25daa5", controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  _controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this._getParsed(fromInput, toInput);
    this._fillSlider(fromInput, toInput, "#C6C6C6", "#25daa5", controlSlider);
    this._setToggleAccessible(toInput, toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  _controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = this._getParsed(fromSlider, toSlider);
    this._fillSlider(fromSlider, toSlider, "#C6C6C6", "#25daa5", toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  _controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = this._getParsed(fromSlider, toSlider);
    this._fillSlider(fromSlider, toSlider, "#C6C6C6", "#25daa5", toSlider);
    this._setToggleAccessible(toSlider, toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  _getParsed(currentFrom, currentTo) {
    const from = parseFloat(currentFrom.value);
    const to = parseFloat(currentTo.value);
    return [from, to];
  }

  _fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
          ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
          ${sliderColor} 100%)`;
  }

  _setToggleAccessible(currentTarget, toSlider) {
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 1;
    }
  }
}

// Creates a button.
class Button extends CustomElement {
  // text: the text to be displayed on the button
  // callback: the callback called when the button is clicked
  constructor(text, callback) {
    super();
    this.button = document.createElement("button");
    this.button.innerText = text;
    this.button.addEventListener("click", (event) => {
      const value = this._getValueFromEvent(event);
      callback(event);
    });
    this.container.appendChild(this.button);
  }

  // Returns the button element
  get() {
    return this.button;
  }

  // Sets the title of the button (tooltip).
  setTitle(title) {
    this.button.title = title;
  }

  // Returns the value from the event caused by the input event.
  _getValueFromEvent(event) {
    return true;
  }
}

// Creates a button which changes color when clicking it.
class ColorChangingButton extends Button {
  // text: the text to be displayed on the button
  // callback: the callback called when the button is clicked
  // color: the color of the button after clicking it
  // defaultColor: the default color of the button
  // clicksToChangeBackColor: the amount of clicks before the color changes back to the default color
  constructor(
    text,
    callback,
    colorToChangeTo,
    defaultColor,
    clicksToChangeBackColor = 1
  ) {
    super(text, (event) => {
      // If the default color was not set, it is found.
      if (this.defaultColor == undefined || this.defaultColor == null) {
        this.defaultColor = this._getDefaultColor(this.button);
        this.button.style.backgroundColor = this.defaultColor;
      }

      // If the color to change to was not set, it is set to the default color.
      if (this.colorToChangeTo == undefined || this.colorToChangeTo == null) {
        this.colorToChangeTo = this._getDefaultColor(this.button);
      }

      // Creates a field for the button called numberOfClicks,
      // which tracks how many times it has been clicked
      if (this.button.numberOfClicks == undefined) {
        this.button.numberOfClicks = 0;
        this.button.style.backgroundColor = colorToChangeTo;
      }
      this.button.numberOfClicks += 1;

      // Ternary to set colorToChangeTo back to defaultColor every clicksToChangeBackColor amount of clicks, else the given colorToChangeTo
      this.button.style.backgroundColor =
        this.button.numberOfClicks % (clicksToChangeBackColor + 1) === 0
          ? this.defaultColor
          : this.colorToChangeTo;

      const value = this.button.numberOfClicks % (clicksToChangeBackColor + 1);
      callback(value);
    });

    this.colorToChangeTo = colorToChangeTo;
    this.defaultColor = defaultColor;
  }

  // Resets the button to its default state (default color and not clicked)
  reset() {
    this.button.style.backgroundColor = this.defaultColor;
    this.button.numberOfClicks = 0;
  }

  // General method to get the default color of an element when hovered
  _getDefaultColor(element) {
    element.classList.add("hovered"); // Avoids the background color of style being the color when hovering the element
    const style = getComputedStyle(element, ":hover");
    const defaultColor = style.backgroundColor;
    element.classList.remove("hovered"); // Avoids the background color of style being the color when hovering the element
    return defaultColor;
  }
}

class ButtonWithIcon extends ColorChangingButton {
  // text: the text to be displayed on the button
  // callback: the callback called when the button is clicked
  // colorToChangeTo: the color of the button after clicking it
  // defaultColor: the default color of the button
  // clicksToChangeBackColor: the amount of clicks before the color changes back to the default color
  constructor(
    text,
    imageName,
    callback,
    colorToChangeTo,
    defaultColor,
    clicksToChangeBackColor = 0
  ) {
    super(
      text,
      callback,
      colorToChangeTo,
      defaultColor,
      clicksToChangeBackColor
    );

    this.imageElement = this._createImageElement(imageName);
    this.buttonText = this._createButtonTextElement(text);
    const buttonContent = this._createElementWithImageAndText(
      this.imageElement,
      this.buttonText
    );

    // Clear existing button content and append the new content
    this.button.innerHTML = "";
    this.button.appendChild(buttonContent);
  }

  addEventListener(event, callback) {
    this.button.addEventListener(event, callback);
  }

  // Sets the text of the button
  setButtonText(buttonText) {
    this.buttonText.innerText = buttonText;
  }

  // Sets the icon of the button
  // The given image should be for example 'icon.png'
  // To change the root path of the icons use the static method setImgRootPath
  setIcon(imageName) {
    this.imageElement.src = CustomElement.imgRootPath + imageName;
  }

  // Creates an image element with the given image name
  _createImageElement(imageName) {
    const imgElement = document.createElement("img");
    imgElement.src = CustomElement.imgRootPath + imageName;
    imgElement.style.width = "16px";
    imgElement.style.height = "16px";
    return imgElement;
  }

  // Creates a span element with the given text
  _createButtonTextElement(text) {
    const buttonText = document.createElement("span");
    buttonText.style.whiteSpace = "nowrap";
    buttonText.innerText = text;
    return buttonText;
  }

  // Creates a div element with the given image and text elements
  _createElementWithImageAndText(imageElement, textElement) {
    const buttonWithImageAndText = document.createElement("div");
    buttonWithImageAndText.style.display = "flex";
    buttonWithImageAndText.style.flexDirection = "column";
    buttonWithImageAndText.style.alignItems = "center";

    buttonWithImageAndText.appendChild(imageElement);
    buttonWithImageAndText.appendChild(textElement);
    return buttonWithImageAndText;
  }
}

//  ConnectedDropDowns class connects multiple dropdown elements so that when an option is selected in one dropdown,
//  the other dropdown with that selected value will change to the old value.
class ConnectedDropDowns {
  // intializes the dropdowns and stores their initial values.
  // dropDowns: and Array of dropdown elements to be connected
  constructor(dropDowns) {
    this.dropDowns = dropDowns;
    this.oldValues = Array.from(dropDowns).map((dropDown) => dropDown.value);
    this._connectDropDowns();
  }

  // Connects the dropdowns.
  _connectDropDowns() {
    this.dropDowns.forEach((dropDown, i) => {
      dropDown.addEventListener("change", (event) => {
        const newValue = event.target.value;
        const oldValue = this.oldValues[i];

        this.dropDowns.forEach((d, j) => {
          if (d.value === newValue && j !== i) {
            d.value = oldValue;
            this.oldValues[j] = oldValue;

            // Create and dispatch a change event for the swapped dropdown
            const changeEvent = new Event("change");
            d.dispatchEvent(changeEvent);
          }
        });

        this.oldValues[i] = newValue;
      });
    });
  }
}

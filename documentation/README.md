# lite API Reference
**The *lite api* is structured as follows:**
1. *create* - functions that creates/initializes an element/object
2. *get* - functions that gets an elements property
3. *set* - functions that sets an elements property
4. *update* - functions that are composed of multiple set and get function calls
5. *delete* - functions that deletes/deinitializes an element/object
6. *event* - functions that adds, removes and handles events 
7. *animation* - functions that use set function calls over multiple frames
8. *utility* - functions that solve some common tasks
9. *global* - global constants and variables

**The *api reference* is structured as follows:**
1. Below are *examples* of each function call
2. *Click the function name* to see the full definition

**create**
```javascript
create_virtual(1);
element = create_element("div");
```
**get**
```javascript
x = get_x(element);
y = get_y(element);
z = get_z(element);
```
**set**
```javascript
set_x(element, reference_element, 1.0);
set_y(element, reference_element, 1.0);
set_z(element, reference_element, 1.0);
```
**update**
```javascript
```
**delete**
```javascript
delete_element(element);
```
**event**
```javascript
add_event("mousedown", element);
remove_event("mousedown", element);
```
**animation**
```javascript
animation_slide_x(element, delta, 1.0, 2.0, 1.0, CURVE_LINEAR);
animation_slide_y(element, delta, 1.0, 2.0, 1.0, CURVE_LINEAR);
```
**utility**
```javascript
center_to_center(element, reference_element);
```
**global**
```javascript
ROOT = 0;
CURVE_LINEAR = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
CURVE_QUAD = [];
CURVE_CUBE = [];
```

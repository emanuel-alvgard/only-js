# lite API Reference
**The *lite api* is structured as follows:**
1. *create* - functions that creates/initializes element/object
2. *get* - functions that gets a element property
3. *set* - functions that sets a element property
4. *update* - functions that are composed of multiple set and get function calls
5. *delete* - functions that deletes/deinitializes an element/object
6. *event* - functions that adds, removes and handles events 
7. *animation* - functions that use set function calls over multiple frames

**The *api reference* is structured as follows:**
1. below are *example calls of each function*
2. *click the function name* to see the full definition

**create**
```javascript
create_virtual_DOM(1);
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
set_x(element, root, 1.0);
set_y(element, root, 1.0);
set_z(element, root, 1.0);
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

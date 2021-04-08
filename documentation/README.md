# lite API Reference
**Structure**
------
*The lite api is structured as follows:*
1. create - functions that creates/initializes element/object
2. get - functions that gets a element property
3. set - functions that sets a element property
4. update - functions that are composed of multiple set and get function calls
5. delete - functions that deletes/deinitializes an element/object
6. event - functions that adds, removes and handles events 
7. animation - functions that use set function calls over multiple frames

*The api reference is structured as follows:*
1. function name and parameter names:
```javascript
create_element(type);
```
2. function call example:
```javascript
create_element("div");
```

**create**
------
```javascript
create_virtual_DOM(size)
create_virtual_DOM(1);
```
```javascript
create_element(type)
element = create_element("div");
```
**get**
------
```javascript
get_x(id)
get_x(element);
```
**set**
------
**update**
------
**delete**
------
**event**
------
**animation**
------

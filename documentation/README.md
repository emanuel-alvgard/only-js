# lite API Reference
**The lite api is structured as follows:**
1. *create* - functions that creates/initializes element/object
2. *get* - functions that gets a element property
3. *set* - functions that sets a element property
4. *update* - functions that are composed of multiple set and get function calls
5. *delete* - functions that deletes/deinitializes an element/object
6. *event* - functions that adds, removes and handles events 
7. *animation* - functions that use set function calls over multiple frames

**create**
```javascript
create_virtual_DOM(size: 0) --> (null)
create_element(type: "", id: 0) --> (0)
```
**get**
```javascript
get_x(id: 0) --> (0.0)
get_y(id: 0) --> (0.0)
get_z(id: 0) --> (0.0)
```
**set**
```javascript
set_x(id: 0, origin: 0, x: 0.0) --> (null)
set_y(id: 0, origin: 0, y: 0.0) --> (null)
set_z(id: 0, origin: 0, z: 0.0) --> (null)
```
**update**
```javascript
```
**delete**
```javascript
delete_element(id: 0) --> (null)
```
**event**
```javascript
add_event(0, 0) --> (null)
remove_event() --> (null)
```
**animation**
```javascript
animation_slide_x(
  id: 0
  delta: 0.0
  start: 0.0
  end: 0.0
  speed: 0.0
  curve: [0.0]
 ) --> (null)
 
animation_slide_y(
  id: 0
  delta: 0.0
  start: 0.0
  end: 0.0
  speed: 0.0
  curve: [0.0]
 ) --> (null)
```

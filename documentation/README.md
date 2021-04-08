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
create_virtual_DOM(size: int) -> (null)
create_element(type: string) -> (integer)
```
**get**
```javascript
get_x(id: int) -> (float)
get_y(id: int) -> (float)
get_z(id: int) -> (float)
```
**set**
```javascript
set_x(id: int, origin: int, x: float) -> (null)
set_y(id: int, origin: int, y: float) -> (null)
set_z(id: int, origin: int, z: float) -> (null)
```
**update**
```javascript
```
**delete**
```javascript
```
**event**
```javascript
```
**animation**
```javascript
```

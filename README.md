# lite.js 
*Data oriented web framework*

**Examples**
------
**Header Menu**
```javascript
// Header
header = create_element("div");
set_width(header, get_width(root));
set_height(header, 100.0);

// Button 1
b1 = create_element("button");
set_width(b1, 50.0);
set_height(b1, 25.0);
set_x(b1, header, 50.0);
set_y(b1, header, 50.0);
set_text_content(b1, "Button 1");

// Button 2
b2 = create_element("button");
set_width(b2, 50.0);
set_height(b2, 25.0);
set_x(b2, header, 150.0);
set_y(b2, header, 50.0);
set_text_content(b2, "Button 2");
```
**Features**
------
+ Fast
+ Small
+ Readable
+ Pure Javascript (no template syntax)
+ SOA memory layout and access
+ Zero dependencies

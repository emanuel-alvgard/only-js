# lite.js 
Data oriented web framework.

**Examples**
------
```javascript
import lite

create_virtual(3);

header = create_element("div");
set_width(header, get_width(root));
set_height(header, 100.0);

b1 = create_element("button");
set_width(b1, 50.0);
set_height(b1, 25.0);
set_x(b1, header, 50.0);
set_y(b1, header, 50.0);
set_text_content(b1, "Button 1");

b2 = create_element("button");
set_width(b2, 50.0);
set_height(b2, 25.0);
set_x(b2, header, 150.0);
set_y(b2, header, 50.0);
set_text_content(b2, "Button 2");
```
**Features**
------
+ Pure JavaScript (no template syntax)
+ Zero dependencies
+ Virtually no garbage collection
+ SOA (structure of arrays) memory layout and access
+ Virtual DOM with flat hierarchy

**Vision**
------
*To create a data oriented web framework 
with as little performance bottlenecks as possible and where 
JavaScript, HTML and CSS are unified into a coherent, readable and pure JavaScript interface.*

# lite.js 
Data Oriented Web Framework.

**Examples**
------
```javascript
import lt from 'lite.js'

lt.create(3);

header = lt.create_element("nav");
lt.set_width(header, lt.get_width(ROOT));
lt.set_height(header, 100.0);

b1 = lt.create_element("button");
lt.set_width(b1, 50.0);
lt.set_height(b1, 25.0);
lt.set_x(b1, header, 50.0);
lt.set_y(b1, header, 50.0);
lt.set_text_content(b1, "Button 1");

b2 = lt.create_element("button");
lt.set_width(b2, 50.0);
lt.set_height(b2, 25.0);
lt.set_x(b2, header, 150.0);
lt.set_y(b2, header, 50.0);
lt.set_text_content(b2, "Button 2");

lt.clear();
```
**Features**
------
+ Superior runtime performance
+ Pure JavaScript (no template syntax)
+ Zero dependencies
+ Virtually no garbage collection
+ SOA (structure of arrays) memory layout and access
+ Virtual DOM with flat hierarchy
+ Avoids JIT deoptimization

**Vision**
------
*To create a data oriented web framework 
with as little performance bottlenecks as possible and where 
JavaScript, HTML and CSS are unified into a coherent, readable and pure JavaScript interface.*

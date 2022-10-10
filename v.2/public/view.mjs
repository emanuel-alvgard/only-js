const view = CONTEXT.view;
const html = CONTEXT.view.html;
const e = CONTEXT.view.element;

// HEADER
const logo = e("logo");
const youtube = e("youtube").hide();
const twitter = e("twitter").hide();
const facebook = e("facebook").hide();

// MENU
const menu = e("menu").hide();
const panel = e("panel").hide();
const close = e("close").hide();

// WELCOME
const welcome_bg = e("s1-bg");
const welcome_title = e("s1-title");
const welcome_text = e("s1-text");
const welcome_b = e("s1-b");

// INFO
const info_bg = e("s2-bg");
const info_img = e("s2-img");
const info_title = e("s2-title");
const info_sub = e("s2-sub");
const info_text = e("s2-text");

// REFERENCE
const ref_bg = e("s4-bg");
const ref_quote = e("s4-quote");
const ref_text = e("s4-text");
const ref_person = e("s4-person");

// POINTS
const points_bg = e("s3-bg");
const points_title = e("s3-title");
const points_p1 = e("s3-p1");
const points_p2 = e("s3-p2");
const points_p3 = e("s3-p3");
const points_t1 = e("s3-text-1");
const points_t2 = e("s3-text-2");
const points_t3 = e("s3-text-3");
const points_b = e("s3-b");

// FORM
const form_bg = e("s5-bg");
const form_title = e("s5-title");
const form_sub = e("s5-sub");
const form_video = e("s5-video");

// Type
const type_form = e("type-form");
const l_type = e("l-type");
const f_type = e("f-type");

// Name
const l_name = e("l-name").hide();
const f_name = e("f-name").hide();

// Personal number
const l_person = e("l-person").hide();
const f_person = e("f-person").hide();

// Org
const l_org = e("l-org");
const f_org = e("f-org");

// Email
const l_email = e("l-email");
const f_email = e("f-email");

// Country
const l_country = e("l-country");
const f_norway = e("f-norway");
const f_finland = e("f-finland");
const f_norway_finland = e("f-norway-finland");
const l_norway = e("l-norway");
const l_finland = e("l-finland");
const l_norway_finland = e("l-norway-finland");

// Bank
const bank_form = e("bank-form");
const l_bank = e("l-bank");
const f_bank = e("f-bank");

// Policy
const l_policy = e("l-policy");
const f_policy = e("f-policy");

// Sign
const sign = e("sign");




// GRID
// @DONE
function _items(key_count, value_count) {
    
    let result = []

    for (let i=0; i < key_count; i++) {
        let item = { 
            key: e("key-" + (i+1)),
            values: []
        }

        item.key.font(null, "montserrat_bold");    
        for (let j=0; j < value_count; j++) {
            item.values.push(e("value-" + (i+1) + "-" + (j+1)));
        }
        result.push(item);
    }
    return result;
}



const grid_items = _items(4, 4);




// @DONE
function SOA_grid(items, top, left, column_width, row_height, column_gap, row_gap) {

    let cell_left = left;

    for (let i=0; i < items.length; i++) {

        let cell_top = top;

        items[i].key.left(cell_left);
        items[i].key.top(cell_top);
        items[i].key.width(column_width[i]);
        items[i].key.height(row_height[0]);

        for (let j=0; j < items[i].values.length; j++) {

            cell_top += row_height[j] + row_gap; 
            items[i].values[j].left(cell_left);
            items[i].values[j].top(cell_top);
            items[i].values[j].width(column_width[i]);
            items[i].values[j].height(row_height[j]);
        }
        cell_left += column_width[i] + column_gap;
    }
}

// @DONE
function AOS_grid(items, top, left, column_width, row_height, column_gap, row_gap, grid_gap) {

    let grid_top = top;

    for (let i=0; i < items.length; i++) { 
        
        items[i].key.left(left);
        items[i].key.top(grid_top);
        items[i].key.width(column_width[i]);
        items[i].key.height(row_height[i]);

        grid_top += row_height[i] + row_gap;
    }

    grid_top += grid_gap;

    for (let i=0; i < items[0].values.length; i++) {

        let cell_top = grid_top;

        for (let j=0; j < items.length; j++) {

            items[j].values[i].left(left);
            items[j].values[i].top(cell_top);
            items[j].values[i].width(column_width[j]);
            items[j].values[i].height(row_height[j]);

            cell_top += row_height[j] + row_gap;
            grid_top += row_height[j] + row_gap; 

        }
        grid_top += grid_gap;
    }
}


// FOOTER
const footer = e("footer");
const copyright = e("copyright");


export {
    footer
}
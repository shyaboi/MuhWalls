(function ($) {

    let t = null;

    const align = {
        "LEFT": "left",
        "CENTER": "center",
        "RIGHT": "right"
    };

    const status = {
        "SUCCESS": "success",
        "NOTICE": "notice",
        "DANGER": "danger",
        "INFO": "info"
    };

    const open_close = {
        "OPEN": "open",
        "CLOSE": "close"
    };


    let settings_toastr = {
        "align": align.RIGHT,
        "status": status.SUCCESS,
        "close": open_close.CLOSE,
        "text_heading": "",
        "text_body": ""
    };

    let Toastr = function (btn, options) {
        settings_toastr.align = typeof options.align === 'string' ? options.align : align.RIGHT;
        settings_toastr.status = typeof options.status === 'string' ? options.status : status.SUCCESS;
        settings_toastr.close = typeof options.close === 'boolean' ? options.close : open_close.CLOSE;
        settings_toastr.text_heading = typeof options.text_heading === 'string' ? options.text_heading : '';
        settings_toastr.text_body = typeof options.text_body === 'string' ? options.text_body : '';

        _init();
    };

    $.fn.toastr = function (options, callback) {
        if (typeof options === 'object') {
            let toastr = $(this).data('Toastr');
            if (toastr === undefined) {
                let thisPlugin = new Toastr($(this), options, callback);
                $(this).data('Toastr', thisPlugin);
                return thisPlugin;
            } else {
                let thisPlugin = new Toastr($(this), options, callback);
                $(this).data('Toastr', thisPlugin);
                return thisPlugin;
            }
        } else return false;
    };

    function _init() {
        t = token();
        let element = _create_toastr(t);
        let i = 0;
        move(i, t, element);
    }

    function _create_toastr(token) {

        let body = document.getElementsByTagName('body')[0];

        let div = document.createElement('div');
        div.id = 'toastr_container_'+token;
        div.classList.add('tr_container');
        div.classList.add('tr_'+settings_toastr.align);
        div.classList.add('tr_'+settings_toastr.status);
        div.classList.add('tr_'+settings_toastr.close);

        let tr_heading = document.createElement('div');
        tr_heading.classList.add('tr-heading');
        let tr_heading_span = document.createElement('span');
        let text_heading_node = document.createTextNode(settings_toastr.text_heading);
        tr_heading_span.appendChild(text_heading_node);
        tr_heading.appendChild(tr_heading_span);

        let tr_body = document.createElement('div');
        tr_body.classList.add('tr-body');
        let tr_body_span = document.createElement('span');
        let text_node = document.createTextNode(settings_toastr.text_body);
        tr_body_span.appendChild(text_node);
        tr_body.appendChild(tr_body_span);

        let progress = document.createElement('div');
        progress.id = 'progress';

        let bar = document.createElement('div');
        bar.id= 'bar_'+token;

        progress.appendChild(bar);

        div.appendChild(tr_heading);
        div.appendChild(tr_body);
        div.appendChild(progress);
        body.append(div);

        return bar;
    }

    function move(i, token, elem) {
        elem.style.backgroundColor = "rgba(255, 255, 255, 0.31)";
        elem.style.position = "absolute";
        elem.style.bottom = '-1px';
        elem.style.height = '6px';
        if (i === 0) {
            i = 1;
            let width = 1;
            let id = setInterval(frame, 50);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";

                }
                if (width === 100) {
                    let div = document.getElementById('toastr_container_'+token);
                    div.style.animation = 'fadeOutUp 0.5s';
                    setTimeout(()=>{
                        div.remove();
                    }, 150);
                }
            }
        }
    }

    let rand = function() {
        return Math.random().toString(36).substr(2);
    };

    function token() {
        return rand() + rand();
    }

})(jQuery);
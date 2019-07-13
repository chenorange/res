!function () {
    let controller = {
        view: null,
        model: null,
        display: function () {
            this.model.getAllComments().then((data) => {
                // results 即为查询结果，它是一个 AV.Object 数组
                let result = data.results;
                for (let comment of result) {
                    this.addComment(comment);
                }
            }, function (error) {  
                console.log(error);
                console.log('获取评论失败');
            }).then(()=>{},(error) => {console.log(error);
            });
        },
        bindEvent: function () {
            this.view.querySelector('section.comment form').addEventListener('submit', (event)=>{
                event.preventDefault();
                let textarea = this.view.querySelector('section.comment form textarea');
                let content = textarea.value;
                this.model.saveComment(content).then(
                    (comment) => {
                        this.addComment(comment);
                        textarea.value = '';
                },
                    (error) => {console.log(error);alert('数据提交失败')}
                );
            });
        },
        addComment: function (comment) {
            let dateArr = comment.createdAt.toString().split(' ');
            let li = document.createElement('li');
            li.textContent = comment.attributes.content;
            document.querySelector('section.comment ol.commentDetail').append(li);
            //添加时间
            let time = dateArr[3] + ' ' + dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[4];
            let date = document.createElement('time');
            date.textContent = time;
            date.className = 'date';
            li.appendChild(date);
        }
    }
     
    let model = { 
        init: function () {
            let appId = '15v7fuh0buxCXIDOKlniruG1-gzGzoHsz';
            let appKey = 'rjDx7veC1vQKEDsbPu1GU4gh';
            AV.init(appId, appKey);
        },
        // √√√√√√√√√
        saveComment: function (content) {  
            let Comment = AV.Object.extend('Comment');
            let comment = new Comment();
            comment.set('content', content);
            return comment.save()
        },
        // √√√√√√√√√
        getAllComments: function () {
            var sql = 'select * from Comment';
            return AV.Query.doCloudQuery(sql);
        },
        getComment: function (id) {
            var query = new AV.Query('Comment');
            return query.get(id);
        }
    };
    
    let view = document.querySelector('section.comment');
    model.init();
    controller.view = view;
    controller.model = model;
    controller.bindEvent();
    controller.display();




}();

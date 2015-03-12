(function($) {
	var tag_editor_template = '<div class="tag-editor"><span>%s</span><div class="tag-input"><input type="text" /><span href="#" class="add-tag" title="Add this tag"></span><span class="prompt">add tag</span></div></div><a href="#" class="addTags" title="Add tags">+ Add tags</a>';
	var post_tag_template = '<span class="post-tag">%tag</span>';
	var delete_template = '<span title="remove this tag" class="delete-tag" title="delete this tag"></span>';
	var validation_error_template = '<div class="message-error"><div class="message-inner"><div class="message-text">%m</div></div></div>';
	// $(delete_template).click(function(){
		// $(this).parents('.post-tag').remove();
	// });
	
	$.fn.tag = function(options){
		var me = this;
		var tags = tag_editor_template.replace(/%s/g, $.map(options.data, function(o){
			return post_tag_template.replace(/%tag/, o);
		}).join(''));
		var html = $(tags);
		
		me.tagEditor = html.prev();
		me.addTags = html.next();
		
		// me.tagEditor.inputArea = me.tagEditor.find(".tag-input");
		// me.tagEditor.inputBox = me.tagEditor.find('input[type="text"]');
		// me.tagEditor.tagSpan = me.tagEditor.find('> span');
		
		me.tagEditor.find('.post-tag').append($(delete_template).click(function(){
				$(this).parents('.post-tag').remove();
		}));
		
		me.tagEditor.find('.add-tag').click(function(){
			var msg_obj = me.validate(me.tagEditor.find('input[type="text"]').val());
			if (msg_obj.result) {
				me.tagEditor.find(".tag-input").removeClass('validate-error');
				var newTags = $(post_tag_template.replace(/%tag/, me.tagEditor.find('input[type="text"]').val())).append(
					$(delete_template).click(function(){
						$(this).parents('.post-tag').remove();
					})
				);
				
				me.tagEditor.find('> span').append(newTags);
				me.tagEditor.find('input[type="text"]').val("");
				me.tagEditor.find(".tag-input").css("display", "none");
				me.addTags.show();
			} else {
				//me.tagEditor.find(".tag-input").addClass('validate-error');
			}
		});
		
		me.addTags.click(function(e){
			me.addTags.hide();//todo
			me.tagEditor.find(".tag-input").css("display", "inline-block");
			me.find('input[type="text"]').focus();
		});
		
		me.tagEditor.find('input[type="text"]').focus(function(){
			me.tagEditor.find('.prompt').hide();
			me.tagEditor.find('.message-error').remove();
			me.tagEditor.find(".tag-input").removeClass('validate-error');
		}).blur(function(){
			var msg_obj = me.validate(me.tagEditor.find('input[type="text"]').val());
			if (!msg_obj.result) {
				if (me.tagEditor.find('.post-tag').length === 0) {
					me.tagEditor.find(".tag-input").addClass('validate-error');
					var validation_error= $(validation_error_template.replace(/%m/g, msg_obj.value));
					me.tagEditor.find(".tag-input").append(validation_error);
				}
				me.tagEditor.find('.prompt').show();
			}
		});
		
		me.validate = function(msg_text){
			if (msg_text === "") {
				return {
					"result":false,
					"value":"Please Enter at least one tag."
				};
			} else {
				return {
					"result":true,
					"value":msg_text
				};
			}
		};
		
		me.val = function(){
			return me.tagEditor.find('.post-tag').map(function(){
				return {
					"id":"1",
					"value":$(this).text()
				}
			}).toArray();
		};
		
		me.append(html);
	};
	
})(jQuery);


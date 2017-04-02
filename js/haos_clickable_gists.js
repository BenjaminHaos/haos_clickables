    var view_needs_update = true;
    var num_of_actions_client_actioned = 0;
    var client_modded_default = false;
    var default_username = "BenjaminHaos";
    var default_user_object;

    function init_clickable_gists() {
        create_array_of_clickable_gist_names_and_raw_url();
    }

    function create_array_of_clickable_gist_names_and_raw_url(user_dom_should_work_with) {
        var basic_github_user_api_string = "https://api.github.com/users/";
        var url_to_call = basic_github_user_api_string + default_username + "/gists";

        requestJSON(url_to_call, function(json) {
            var basic_user_data_html_string = "NOT_SET";
            var error_string = "GitHub API Rate Limit Exceeded!"

            if (json.message == "Not Found") {
                basic_user_data_html_string = error_string;
            }
            else {
                default_user_object = json;
            }
            for (var i = 0; i < default_user_object.length; i++) {
                gist_file_name_array = Object.keys(default_user_object[i].files);
                for (k = 0; k < Object.keys(default_user_object[i].files).length; k++) {
                    if (gist_file_name_array[k].includes("_CLICKABLE")) {
                        var clickable_gist_filename = gist_file_name_array[k];
                        var clickable_gist_raw_url = default_user_object[i].files[gist_file_name_array[k]].raw_url;

                        var clickable_gist_description = default_user_object[i]["description"];

                        var clickable_gist_github_url = default_user_object[i]["html_url"];

                        var clickable_gist_html_link = '<a class="clickable_gist_link" href="' + clickable_gist_github_url + '" target="_blank">' + clickable_gist_filename + '</a>';
                        var id_for_clickable = clickable_gist_filename.substring(0, clickable_gist_filename.indexOf('.')) + "_clickable"


                        var html_line_for_label = "<label for=\"" + id_for_clickable + "\">" + clickable_gist_html_link + "</label>";

                        var text_for_clickable = "bash <(curl -s " + clickable_gist_raw_url + ")";
                        var html_line_clickable = '<input type="text" id="' + id_for_clickable + '" value="' + text_for_clickable + '" />';
                        var html_line_for_clickable_button = '<button title="' + clickable_gist_description + '" data-copytarget="#' + id_for_clickable + '">copy</button>'

                        $("#clickableGists").append(html_line_for_label);
                        $("#clickableGists").append(html_line_clickable);
                        $("#clickableGists").append(html_line_for_clickable_button);
                    }
                }
            }
        });

    }

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }


    init_clickable_gists();
    
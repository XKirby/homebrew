{%- comment -%}
  Use {% include contributors/page.md slug=STRING %}
  for a Markdown section summary of tags with the specified slug,
  including a list of links to pages and posts that have such a tag.

  When the slug parameter is omitted, the name of the including file is used.

  This is only the header, without the articles, so you can put stuff in between when used in conjunction with page_light.md
{%- endcomment -%}

{%- assign current_page_slug = page.url | split: "/" | last -%}

{%- assign page_slug = include.slug | default: current_page_slug -%}

{% include contributors/tagged_pages.html slug=page_slug %}

{% assign contributor_data = site.data.contributors | where: 'id', page_slug | first %}

  <div class="contributor-footer">
    <div class="c-f-image">
      {% if contributor_data.avatar %}
        <img class="droplet-border" src="{{ "/assets/images/user_pics/" | append: contributor_data.avatar | absolute_url }}" alt="{{contributor_data.name}}" width="128" height="128">
      {% else %}
        <img class="droplet-border" src="{{ "/assets/images/rtw_square.png" | absolute_url }}" alt="{{contributor_data.name}}" width="128" height="128">
      {% endif %}
    </div>
    <div class="c-f-infos">
      <div class="c-f-i-name">
        <h2 id="{{page_slug}}">{{contributor_data.name}}</h2>
      </div>
      <div class="c-f-i-bio">
        {% if contributor_data.bio %}
        {{ contributor_data.bio }}
        {% endif %}
      </div>
    </div>
  </div>
{%- comment -%}
  Use {% include contributors/page.md slug=STRING %}
  for a Markdown section summary of tags with the specified slug,
  including a list of links to pages and posts that have such a tag.

  When the slug parameter is omitted, the name of the including file is used.
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

{% assign contributor_url = page_slug | prepend: "/contributor/" -%}
<!-- {%- if contributor_url == page.url -%}
{{ page.description }}
{%- endif %} -->

Articles: {{ tagged_pages.size }}

{%- for tagged_page in tagged_pages %}
{%- assign is_first_contributor = true %}

- <a href="{{ site.url }}{{ site.baseurl }}{{ tagged_page.url }}">{{ tagged_page.title }}</a>{% if tagged_page.summary %} - {{ tagged_page.summary }}{% endif %} (By{%- for contributor_3 in tagged_page.contributors %}{% if is_first_contributor == true %} {%- assign is_first_contributor = false %}{% else%}, {% endif %}{% include contributors/contributor_link.html contributor=contributor_3 %}{%- endfor %})
{% endfor %}

{%- assign current_page_slug = nil -%}
{%- assign page_slug = nil -%}
{%- assign contributor_url = nil -%}
{%- assign tagged_page = nil -%}
{%- assign tagged_pages = nil -%}

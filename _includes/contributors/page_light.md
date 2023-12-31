{%- comment -%}
  Use {% include contributors/page.md slug=STRING %}
  for a Markdown section summary of tags with the specified slug,
  including a list of links to pages and posts that have such a tag.

  When the slug parameter is omitted, the name of the including file is used.

  This is a light version meant to be used if you only want to include the article list and not the rest of your page.
{%- endcomment -%}

{%- assign current_page_slug = page.url | split: "/" | last -%}

{%- assign page_slug = include.slug | default: current_page_slug -%}

{% include contributors/tagged_pages.html slug=page_slug %}

Articles: {{ tagged_pages.size }}

{%- for tagged_page in tagged_pages %}
{%- assign is_first_contributor = true %}

- <a href="{{ site.url }}{{ site.baseurl }}{{ tagged_page.url }}">{{ tagged_page.title }}</a>{% if tagged_page.summary %} - {{ tagged_page.summary }}{% endif %} (By{%- for contributor_3 in tagged_page.contributors %}{% if is_first_contributor == true %} {%- assign is_first_contributor = false %}{% else%}, {% endif %} {% include contributors/contributor_link.html contributor=contributor_3 %}{%- endfor %})
{% endfor %}

{%- assign current_page_slug = nil -%}
{%- assign page_slug = nil -%}
{%- assign contributor_url = nil -%}
{%- assign tagged_page = nil -%}
{%- assign tagged_pages = nil -%}

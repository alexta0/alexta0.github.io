<h1 id="projects"></h1>

<h2 style="margin: 60px 0px -15px;">Projects <temp style="font-size:15px;">

<!-- [</temp><a href="https://scholar.google.com/citations?user=SCHOLAR_ID&user=dwIyWrEAAAAJ" target="_blank" style="font-size:15px;">Google Scholar</a><temp style="font-size:15px;">] -->


<div class="publications">
<ol class="bibliography">

{% for link in site.data.projects.main %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
            {% if link.project_type %} <abbr class="badge">{{ link.project_type }}</abbr>{% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <!-- <div class="author">{{ link.authors }}</div> -->
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
      <i style="color:#595959; font-style: italicized;">{% if link.date %} 
      {{ link.date }}
      {% endif %}</i>
      <br>
      <i style="color:#595959; font-style: normal;">{% if link.descriptions %} 
      {{ link.descriptions }}
      {% endif %}</i>
      <br>
    <div class="links">
      <i style="font-style: normal;">{% if link.technologies %} 
      Technologies: {{ link.technologies }}
      {% endif %}</i>
      <br>
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.slides %} 
      <a href="{{ link.slides }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Slides</a>
      {% endif %}
      {% if link.page %} 
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.bibtex %} 
      <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
      {% endif %}
      {% if link.notes %} 
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
    </div>
  </div>
</div>
</li>

<br>

{% endfor %}


</ol>
</div>



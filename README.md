# Plugin_Biodata-HPO-

A browser plug-in to clean up messy biomedical data

As a clinical genomics researcher, I try to understand how changes in our genome lead to rare genetic disorders.  This requires collecting clinical data from various sources. The problem is that medical terminology is not really standardised, ‘large head’, ‘big head’ and ‘macrocephaly’ all mean the same thing, but this would not be obvious to a computer. You could not even tally up all people with ‘large head’ in a spreadsheet if some people have been recorded as having a ‘big head’. Let alone do anything more fancy, like machine learning.

The Human Phenotype Ontology (HPO) has been developed to address this problem. The HPO provides a standard vocabulary of over 10’000 terms to describe clinical features of patients with rare diseases. For example HPO Term HP:0000256 stands for ‘macrocephaly’ and has the synonyms ‘large head’ and ‘big head’.  If everybody used HPO terms to describe clinical features of their patients, research on rare genetic diseases would progress in leaps and bounds!

Unfortunately, looking up the right HPO term for a clinical feature takes a few extra steps: you need to go to the HPO website, search for your clinical feature of interest (e.g. ‘large head’),  choose the right HPO term from the search results, copy the HPO ID and paste it into your primary database. Though not particularly onerous, having to do this hundreds of times quickly becomes time consuming.

I would like to build a browser plugin that facilitates this process. Just highlight a clinical feature in your browser, click the HPO extension button and your clipboard will contain the correct HPO ID ready to paste wherever you need it!

Bioportal and the EBI Ontology Lookup Service provide APIs to query the HPO, which could be used for this project. In fact, these APIs can query many other biomedical ontologies, so the Chrome Extension could be easily modified to serve other researcher needs!

We developed a first prototype of such a Browser plugin during HealthHack Sydney 2017 (and won 3rd place!). The pitch presentation can be found here and the code for this prototype can be found here. More recently, we started collaborating with Jon Udell from [Hypothes.is](https://web.hypothes.is/) to build such a plugin using his hlib library. 

Please join this project and make ontologies great again!

For further information, please contact Prof Andreas Zankl, Kinghorn Centre for Clinical Genomics, Garvan Institute of Medical Research, a.zankl@garvan.org.au

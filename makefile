DES=""
TARGET=""

promp:
	@echo "usage: make dev/beta/pro"

dev:
	@echo "make dev ..." ;\
	rm -r config/config.js; \
	cp config/config.dev.js config/config.js; \
	chmod 777 config/config.js -R;

beta:
	@echo "make beta ..." ;\
  	rm -r config/config.js; \
  	cp config/config.beta.js config/config.js; \
  	chmod 777 config/config.js -R;

pro:
	@echo "make pro ..." ;\
  	rm -r config/config.js; \
  	cp config/config.pro.js config/config.js; \
  	chmod 777 config/config.js -R;

project:
	@echo "make project ..." ;\
  	cp unpackage/dist/dev/mp-weixin/project.config.json static/h5/project.config.json; \
  	chmod 777 static/h5/project.config.json -R;

mv_project:
	@echo "make project ..." ;\
  	cp static/h5/project.config.json unpackage/dist/dev/mp-weixin/project.config.json; \
  	chmod 777 unpackage/dist/dev/mp-weixin/project.config.json -R;
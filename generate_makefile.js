function generate_makefile(func_name) {

return `DIR_INC = -I./
DIR_LIB = -L./
TARGET	= ../../releasejscallc/${func_name}/${func_name}
CFLAGS = -g -Wall $(DIR_INC) $(DIR_LIB)
LDFLAGS += -lstdc++
SRCDIR:=
SRCS := $(wildcard *.cpp) $(wildcard $(addsuffix /*.cpp, $(SRCDIR)))
OBJECTS := $(patsubst %.c,%.o,$(SRCS))
$(TARGET) : $(OBJECTS)
\tgcc $(CFLAGS) $^ -o $@ $(LDFLAGS)
\tcp ../../jscallc/${func_name}/${func_name}_proxy.js ../../releasejscallc/${func_name}/
\tcp ../../jscallpython/${func_name}/${func_name}_proxy.js ../../releasejscallpython/${func_name}/
\tcp ../../python/${func_name}/${func_name}_imp.py ../../releasejscallpython/${func_name}/
\tchmod +x ../../releasejscallpython/${func_name}/${func_name}_imp.py
%.o : %.c
\tgcc -c $(CFLAGS) $< -o $@
clean:
\t@rm -f *.o $(TARGET)
\trm -rf ../../releasejscallc/${func_name}/*
\trm -rf ../../releasejscallpython/${func_name}/*
.PHONY:clean`

}

module.exports = generate_makefile;


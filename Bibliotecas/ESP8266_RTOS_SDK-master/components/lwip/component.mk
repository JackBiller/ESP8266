#
# Component Makefile
#
COMPONENT_ADD_INCLUDEDIRS += include/lwip/apps \
                             lwip/src/include \
                             port/esp8266/include \
                             lwip/src/include/posix

COMPONENT_SRCDIRS += apps/dhcpserver \
                     apps/multi-threads \
                     lwip/src/api \
                     lwip/src/apps/sntp \
                     lwip/src/core \
                     lwip/src/core/ipv4 \
                     lwip/src/core/ipv6 \
                     lwip/src/netif \
                     port/esp8266/freertos \
                     port/esp8266/netif

CFLAGS += -Wno-address #lots of LWIP source files evaluate macros that check address of stack variables

lwip/src/apps/sntp/sntp.o: CFLAGS += -Wno-implicit-function-declaration
lwip/src/core/ipv4/ip4.o: CFLAGS += -Wno-implicit-function-declaration

ifdef CONFIG_LWIP_SOCKET_MULTITHREAD
COMPONENT_OBJEXCLUDE := lwip/src/api/sockets.o
endif

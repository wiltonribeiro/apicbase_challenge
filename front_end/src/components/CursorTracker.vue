<template>
    <div
        class="cursor-tracker"
        :style="{
            marginLeft: clientX,
            marginTop: clientY,
            top,
            left,
            width,
            transform: `translate(-${left}, -${top})`
        }"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'CursorTracker',
    props: ['top', 'left', 'width', 'speed'],
    data() {
        return {
            clientX: 0,
            clientY: 0
        };
    },
    methods: {
        moveAnimation: function(e) {
            this.clientX = e.clientX / this.speed + 'px';
            this.clientY = e.clientY / this.speed + 'px';
        }
    },
    created() {
        document.addEventListener('mousemove', this.moveAnimation);
    }
}
</script>

<style lang="scss">
.cursor-tracker {
    position: absolute;
    transform: translate(-50%, -50%);
}
</style>

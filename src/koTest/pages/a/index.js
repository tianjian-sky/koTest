import './index.less'
import view1 from './view1.ejs'
import ko from 'knockout'

export class PageA {
    init () {
        console.log('knockout', ko)
        function MyViewModel () {
            this.personName = ko.observable('Bob'),
            this.personAge = ko.observable(123),
            this.lyricList = ko.observableArray([
                { name: "When forty winters shall besiege thy brow,", type: "Bear" },
                { name: "And dig deel trenches in thy beauty's field,", type: "Hippo" },
                { name: "Thy youth's proud livery, so gazed on now,", type: "Hippo" },
                { name: "TWill be a tatter'd weed of small worth held:", type: "Unknown" }
            ])
            this.basicInfo = ko.computed(function() {
                console.log(this,this)
                return this.personName() + " " + this.personAge()
            }, this),
            this.shouldShowMessage = ko.observable(true)
        }
        let myViewModel = new MyViewModel()
        // subscribe change
        let subscription1 = myViewModel.personName.subscribe(function(newValue) {
            alert("The person's new name is " + newValue);
            subscription1.dispose();
        });
        myViewModel.personName.subscribe(function(oldValue) {
            alert("The person's previous name is " + oldValue);
        }, null, "beforeChange");
        let container = document.getElementById('djzyWeb')
        container.innerHTML = view1()
        ko.applyBindings(myViewModel)
        myViewModel.personName('LiSongMao').personAge(150)
    }
}
Vagrant.configure(2) do |config|
  config.vm.box = 'ubuntu/trusty64'
  config.vm.hostname = 'Hain-LiveClean-UI'

  config.vm.network 'forwarded_port', guest: 8000, host: 8000, auto_correct: true

  config.vm.synced_folder '.', '/home/vagrant/project'

  config.ssh.forward_agent = true

  config.vm.provider 'virtualbox' do |vb|
    vb.gui = false
    vb.memory = '2048'
    vb.cpus = 2
  end

  $SERVER_SETUP = <<-SCRIPT
    fallocate -l 1G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab
    sysctl vm.swappiness=10
    echo "vm.swappiness=10" >> /etc/sysctl.conf
    sysctl vm.vfs_cache_pressure=50
    echo "vm.vfs_cache_pressure = 50" >> /etc/sysctl.conf
    ln -sf /usr/share/zoneinfo/UTC /etc/localtime
    locale-gen en_US.UTF-8
    export LANG=en_US.UTF-8
    curl -sSL https://get.docker.io/ | sh
    usermod -aG docker vagrant
    apt-get install -y git python-pip
    pip install docker-compose
  SCRIPT

  config.vm.provision 'shell', inline: $SERVER_SETUP, privileged: true
end
